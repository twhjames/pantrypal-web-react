import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { chatWithHistory, getChatSessionHistory } from "@/api/chatbot";
import { ArrowLeft, Send, ChefHat, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage, Recipe } from "@/types";

const MarkdownText = ({ text }: { text: string }) => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
);

interface RecipeChatProps {
    recipe: Recipe;
    onBack: () => void;
    sessionId: number;
    initialMessages?: ChatMessage[];
}

export const RecipeChat = ({
    recipe,
    onBack,
    sessionId,
    initialMessages,
}: RecipeChatProps) => {
    const { userId, token } = useAuth();
    const parseContent = (content: string): string => {
        try {
            const data = JSON.parse(content);
            return data.assistant_comment || content;
        } catch {
            return content;
        }
    };

    const [messages, setMessages] = useState(
        initialMessages?.map((m, idx) => ({
            id: idx,
            type: m.role === "user" ? "user" : "bot",
            text: parseContent(m.content),
        })) || [
            {
                id: 1,
                type: "bot",
                text: `Hi! I'm here to help you customize the ${recipe.name} recipe. You can ask me to modify ingredients, cooking methods, or dietary preferences. What would you like to adjust?`,
            },
        ]
    );
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        async function loadHistory() {
            if (sessionId && !initialMessages) {
                try {
                    const history = await getChatSessionHistory(
                        sessionId,
                        token
                    );
                    setMessages(
                        history.map((msg, idx) => ({
                            id: idx,
                            type: msg.role === "user" ? "user" : "bot",
                            text: parseContent(msg.content),
                        }))
                    );
                } catch (error) {
                    console.error("Failed to load chat history", error);
                }
            }
        }
        loadHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: "user",
            text: inputValue,
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await chatWithHistory(
                {
                    user_id: userId ?? 0,
                    session_id: sessionId,
                    role: "user",
                    content: inputValue,
                },
                token
            );
            let text = response.reply;
            try {
                const data = JSON.parse(response.reply);
                text = data.assistant_comment || response.reply;
            } catch {
                // ignore JSON parse errors
            }
            const botMessage = {
                id: Date.now(),
                type: "bot",
                text,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error", error);
        }
        setInputValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const suggestedQuestions = [
        "Can I substitute an ingredient?",
        "Make it vegetarian",
        "Reduce cooking time",
        "Add more protein",
        "Make it spicier",
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="hover:bg-gray-100"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Recipes
                </Button>
                <div className="flex items-center space-x-2">
                    <ChefHat className="w-6 h-6 text-green-600" />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Recipe Assistant
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recipe Details Card */}
                <Card className="lg:col-span-1 overflow-y-auto max-h-[calc(100vh-8rem)] flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{recipe.cookTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{recipe.servings} servings</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1 overflow-y-auto">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Ingredients:
                            </h4>
                            <div className="space-y-1">
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between space-x-2"
                                    >
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <span className="text-sm flex-1 truncate cursor-pointer">
                                                    {ingredient.name}
                                                </span>
                                            </PopoverTrigger>
                                            <PopoverContent side="bottom">
                                                {ingredient.name}
                                            </PopoverContent>
                                        </Popover>
                                        <Badge
                                            variant="outline"
                                            className="text-xs whitespace-nowrap"
                                        >
                                            {ingredient.available
                                                ? "Available"
                                                : "Need to buy"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Instructions:
                            </h4>
                            <ol className="text-sm space-y-2">
                                {recipe.instructions.map((step, idx) => (
                                    <li key={idx} className="flex">
                                        <span className="font-medium text-green-600 mr-2">
                                            {idx + 1}.
                                        </span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Interface Card */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Chat with Recipe Assistant</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Chat Window */}
                        <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.type === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${
                                            message.type === "user"
                                                ? "bg-green-600 text-white"
                                                : "bg-white text-gray-900 border border-gray-200"
                                        }`}
                                    >
                                        {message.type === "user" ? (
                                            <p className="text-sm whitespace-pre-wrap">
                                                {message.text}
                                            </p>
                                        ) : (
                                            <MarkdownText text={message.text} />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                                Quick suggestions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((question, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setInputValue(question)}
                                        className="text-xs hover:bg-green-50 hover:border-green-300"
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Input and Send Button */}
                        <div className="flex space-x-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about modifications, substitutions, or cooking tips..."
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSendMessage}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
