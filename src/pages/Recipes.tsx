import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChefHat, Sparkles, MessageCircle, Clock, Users } from "lucide-react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeChat } from "@/components/Pantry/RecipeChat";
import type { Recipe } from "@/types";

const Recipes = () => {
    const location = useLocation();
    const [chats, setChats] = useState<Recipe[]>([]); // Stores history of created recipe chats
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Currently selected chat session

    // TODO: Replace with actual API call to fetch saved recipe chats from backend
    useEffect(() => {
        const mockRecipes: Recipe[] = [
            {
                id: "1",
                name: "Spaghetti Bolognese",
                description: "Hearty tomato-based pasta with minced beef",
                cookTime: 45,
                servings: 4,
                ingredients: [
                    { name: "pasta", available: true },
                    { name: "minced beef", available: true },
                    { name: "tomato sauce", available: true },
                    { name: "onions", available: false },
                    { name: "garlic", available: false },
                ],
                matchedIngredients: 3,
                totalIngredients: 5,
                instructions: [
                    "Boil water and cook pasta until al dente.",
                    "Sauté onions and garlic until fragrant.",
                    "Add minced beef and cook until browned.",
                    "Stir in tomato sauce and simmer.",
                    "Combine sauce with drained pasta and serve hot.",
                ],
            },
            {
                id: "2",
                name: "Avocado Toast",
                description: "Quick breakfast with smashed avocado and lemon",
                cookTime: 10,
                servings: 2,
                ingredients: [
                    { name: "bread", available: true },
                    { name: "avocado", available: true },
                    { name: "lemon juice", available: false },
                    { name: "salt", available: false },
                ],
                matchedIngredients: 2,
                totalIngredients: 4,
                instructions: [
                    "Toast the bread slices to your desired crispness.",
                    "Mash the avocado with lemon juice and salt.",
                    "Spread the avocado mix on the toast.",
                    "Serve immediately for best taste.",
                ],
            },
        ];
        setChats(mockRecipes);
    }, []);

    // Handle navigation from Home page with recipe suggestion
    useEffect(() => {
        const state = location.state as { startNewChatWithSuggestion?: string };
        if (state?.startNewChatWithSuggestion) {
            handleStartNewChat(state.startNewChatWithSuggestion);
            // Clear the location state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Handles creating a new blank recipe chat or with suggestion
    const handleStartNewChat = (suggestion?: string) => {
        const newRecipe: Recipe = {
            id: Date.now().toString(), // Temporary unique ID
            name: suggestion || "Untitled Recipe",
            description: suggestion ? `Recipe based on: ${suggestion}` : "",
            cookTime: 0,
            servings: 1,
            ingredients: [],
            matchedIngredients: 0,
            totalIngredients: 0,
            instructions: [],
        };

        setChats([...chats, newRecipe]);
        setSelectedRecipe(newRecipe);
    };

    // Opens existing chat again if needed
    const handleResumeChat = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    // Returns badge color based on ingredient match percentage
    const getAvailabilityColor = (matched: number, total: number): string => {
        const percentage = total === 0 ? 0 : (matched / total) * 100;
        if (percentage === 100) return "bg-green-100 text-green-800";
        if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
        return "bg-orange-100 text-orange-800";
    };

    // Conditional rendering for chat interface
    if (selectedRecipe) {
        return (
            <AppLayout>
                <RecipeChat
                    recipe={selectedRecipe}
                    onBack={() => setSelectedRecipe(null)} // Exit chat
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
                            onClick={() => handleStartNewChat()}
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
                            onClick={() => handleStartNewChat()}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start New Recipe Chat
                        </Button>
                    </div>

                    {/* Previously created chats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chats.map((recipe) => (
                            <Card
                                key={recipe.id}
                                className="hover:shadow-md border border-gray-200 transition-shadow duration-200 cursor-pointer group"
                                onClick={() => handleResumeChat(recipe)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors">
                                            {recipe.name || "Untitled Recipe"}
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

                                <CardContent className="space-y-4">
                                    {/* Meta Info */}
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{recipe.cookTime} min</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>
                                                {recipe.servings} servings
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ingredients */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Ingredients needed:
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {recipe.ingredients.map(
                                                (ingredient, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {ingredient.name}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleResumeChat(recipe);
                                        }}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Chat & Customise
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Recipes;
