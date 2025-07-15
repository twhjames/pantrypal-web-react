import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChefHat, Sparkles, MessageCircle, Clock, Users } from "lucide-react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeChat } from "@/components/Pantry/RecipeChat";
import { useAuth } from "@/contexts/AuthContext";
import { listChatSessions, recommendRecipe } from "@/api/chatbot";
import type { ChatMessage, ChatSession, Recipe } from "@/types";

const Recipes = () => {
    const location = useLocation();
    const { userId, token } = useAuth();
    const [chats, setChats] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
        null
    );
    const [initialMessages, setInitialMessages] = useState<
        ChatMessage[] | undefined
    >(undefined);

    const mapSessionToRecipe = (session: ChatSession): Recipe => {
        const availableList = Array.isArray(session.available_ingredients)
            ? session.available_ingredients.map((ing) => ing.toLowerCase())
            : [];

        return {
            id: String(session.id),
            name: session.title,
            description: session.summary || "",
            cookTime: session.prep_time || 0,
            servings: 1,
            ingredients: session.ingredients.map((name) => ({
                name,
                available: availableList.includes(name.toLowerCase()),
            })),
            matchedIngredients: Array.isArray(session.available_ingredients)
                ? session.available_ingredients.length
                : typeof session.available_ingredients === "number"
                ? session.available_ingredients
                : 0,
            totalIngredients: session.total_ingredients,
            instructions: session.instructions,
        };
    };

    const fetchSessions = async () => {
        if (!userId) return;
        try {
            const sessions = await listChatSessions(userId, token);
            setChats(sessions);
        } catch (error) {
            console.error("Failed to load recipe chats:", error);
        }
    };

    useEffect(() => {
        fetchSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, token]);

    // Handle navigation from Home page with recipe suggestion
    useEffect(() => {
        const state = location.state as { startNewChatWithSuggestion?: string };
        if (state?.startNewChatWithSuggestion) {
            void handleStartNewChat(state.startNewChatWithSuggestion);
            // Clear the location state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Handles creating a new blank recipe chat or with suggestion
    const handleStartNewChat = async (suggestion?: string) => {
        try {
            const response = await recommendRecipe(
                {
                    user_id: userId ?? 0,
                    role: "user",
                    content: suggestion || "Give me a recipe recommendation",
                },
                token
            );

            let data: any = {};
            try {
                data = JSON.parse(response.reply);
            } catch (err) {
                console.error("Failed to parse recommendation", err);
            }
            const current_session_id = data.id;
            const newSession: ChatSession = {
                id: current_session_id,
                title: data.title || suggestion || "Untitled Recipe",
                summary:
                    data.summary ||
                    (suggestion ? `Recipe based on: ${suggestion}` : ""),
                prep_time:
                    typeof data.prep_time === "string"
                        ? parseInt(data.prep_time)
                        : data.prep_time || 0,
                instructions: data.instructions || [],
                ingredients: data.ingredients || [],
                available_ingredients: data.available_ingredients ?? [],
                total_ingredients: data.total_ingredients || 0,
            };
            const userMsg: ChatMessage = {
                user_id: userId ?? 0,
                session_id: current_session_id,
                role: "user",
                content: suggestion || "Give me a recipe recommendation",
                timestamp: new Date().toISOString(),
            };
            const firstMsg: ChatMessage = {
                user_id: userId ?? 0,
                session_id: current_session_id,
                role: "assistant",
                content: data.assistant_comment || "",
                timestamp: new Date().toISOString(),
            };

            setInitialMessages([userMsg, firstMsg]);
            setSelectedSession(newSession);
            await fetchSessions();
        } catch (error) {
            console.error("Failed to start new chat", error);
        }
    };

    // Opens existing chat again if needed
    const handleResumeChat = (session: ChatSession) => {
        setSelectedSession(session);
        setInitialMessages(undefined);
    };

    // Returns badge color based on ingredient match percentage
    const getAvailabilityColor = (matched: number, total: number): string => {
        const percentage = total === 0 ? 0 : (matched / total) * 100;
        if (percentage === 100)
            return "bg-green-100 text-green-800 hover:bg-green-200";
        if (percentage >= 70)
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
        return "bg-red-100 text-red-800 hover:bg-red-200";
    };

    // Conditional rendering for chat interface
    if (selectedSession) {
        return (
            <AppLayout>
                <RecipeChat
                    recipe={mapSessionToRecipe(selectedSession)}
                    onBack={() => {
                        setSelectedSession(null);
                        setInitialMessages(undefined);
                        void fetchSessions();
                    }} // Exit chat
                    sessionId={selectedSession.id}
                    initialMessages={initialMessages}
                />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            {chats.length === 0 ? (
                // Vertically centered empty state CTA
                <div className="flex items-center justify-center min-h-[80vh] text-center px-4">
                    <div className="pt-2 space-y-6 mx-auto">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                            <ChefHat className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Let's cook something delicious!
                        </h2>
                        <p className="text-gray-600">
                            You haven't created any recipe chats yet. Tap the
                            button below to start chatting with our AI chef.
                        </p>
                        <Button
                            onClick={() => void handleStartNewChat()}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start New Recipe Chat
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="pt-2 space-y-6 mx-auto">
                    {/* Header Section */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Recipe Recommendations
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Start a chat to get personalized recipes based on
                            your pantry ingredients.
                        </p>

                        <Button
                            onClick={() => void handleStartNewChat()}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start New Recipe Chat
                        </Button>
                    </div>

                    {/* Previously created chats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chats.map((session) => {
                            const recipe = mapSessionToRecipe(session);
                            return (
                                <Card
                                    key={session.id}
                                    className="hover:shadow-md border border-gray-200 transition-shadow duration-200 cursor-pointer group flex flex-col h-full"
                                    onClick={() => handleResumeChat(session)}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors">
                                                {recipe.name ||
                                                    "Untitled Recipe"}
                                            </CardTitle>
                                            <Badge
                                                className={getAvailabilityColor(
                                                    recipe.matchedIngredients,
                                                    recipe.totalIngredients
                                                )}
                                            >
                                                {recipe.matchedIngredients}/
                                                {recipe.totalIngredients}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {recipe.description ||
                                                "No description yet. Click to continue..."}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-4 flex flex-col justify-between flex-1">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    {recipe.cookTime} min
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>
                                                    {recipe.servings} servings
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                Ingredients needed:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {recipe.ingredients
                                                    .slice(0, 5)
                                                    .map((ingredient, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {ingredient.name}
                                                        </Badge>
                                                    ))}
                                                {recipe.ingredients.length >
                                                    5 && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        +
                                                        {recipe.ingredients
                                                            .length - 5}{" "}
                                                        more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleResumeChat(session);
                                            }}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            Chat & Customise
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Recipes;
