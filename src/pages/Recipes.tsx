
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Recipe } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Users, MessageCircle, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    // Check if recipes were previously generated
    fetchExistingRecipes();
  }, []);

  const fetchExistingRecipes = async () => {
    try {
      // TODO: API Call to GET /recipes/recommendations endpoint
      console.log('API Call: GET /recipes/recommendations');
      
      // Mock check for existing recipes
      const hasExisting = false; // Replace with actual API response
      setHasGenerated(hasExisting);
    } catch (error) {
      console.error('Failed to check existing recipes:', error);
    }
  };

  const generateRecipes = async () => {
    setIsGenerating(true);
    try {
      // TODO: API Call to POST /recipes/generate endpoint
      console.log('API Call: POST /recipes/generate');
      
      // Mock recipe generation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          name: 'Banana Bread',
          description: 'Delicious homemade banana bread using your ripe bananas',
          cookTime: 60,
          servings: 8,
          ingredients: ['bananas', 'flour', 'sugar', 'eggs', 'butter'],
          matchedIngredients: 2,
          totalIngredients: 5,
          instructions: [
            'Preheat oven to 350°F',
            'Mash bananas in a bowl',
            'Mix dry ingredients',
            'Combine wet and dry ingredients',
            'Bake for 60 minutes'
          ]
        },
        {
          id: '2',
          name: 'Fresh Fruit Smoothie',
          description: 'Healthy smoothie with your fresh fruits and yogurt',
          cookTime: 5,
          servings: 2,
          ingredients: ['bananas', 'yogurt', 'milk', 'honey'],
          matchedIngredients: 3,
          totalIngredients: 4,
          instructions: [
            'Add all ingredients to blender',
            'Blend until smooth',
            'Serve immediately'
          ]
        },
        {
          id: '3',
          name: 'Milk-Based Pancakes',
          description: 'Fluffy pancakes perfect for breakfast',
          cookTime: 20,
          servings: 4,
          ingredients: ['milk', 'flour', 'eggs', 'sugar', 'baking powder'],
          matchedIngredients: 2,
          totalIngredients: 5,
          instructions: [
            'Mix dry ingredients',
            'Whisk milk and eggs',
            'Combine mixtures',
            'Cook on griddle',
            'Serve hot'
          ]
        }
      ];

      setRecipes(mockRecipes);
      setHasGenerated(true);
      
      toast({
        title: "Recipes Generated! 🍽️",
        description: `Found ${mockRecipes.length} recipe suggestions based on your pantry`,
      });
    } catch (error) {
      console.error('Failed to generate recipes:', error);
      toast({
        title: "Error",
        description: "Failed to generate recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChatAndCustomize = (recipe: Recipe) => {
    // TODO: API Call to POST /chat/recipe-context endpoint
    console.log('API Call: POST /chat/recipe-context', { recipeId: recipe.id });
    
    toast({
      title: "AI Chat Coming Soon",
      description: "Recipe customization chat will be available soon!",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Recommendations 🍽️</h1>
          <p className="text-gray-600 mt-2">Get personalized recipes based on your pantry items</p>
        </div>

        {!hasGenerated ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-6">👨‍🍳</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Cook Something Amazing?</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Let our AI chef analyze your pantry and suggest delicious recipes you can make right now!
            </p>
            <Button
              onClick={generateRecipes}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 h-auto"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating Recipes...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-5 w-5" />
                  Generate Recipes
                </>
              )}
            </Button>
          </div>
        ) : (
          /* Recipes List */
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} based on your pantry
              </p>
              <Button
                onClick={generateRecipes}
                disabled={isGenerating}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Sparkles size={16} />
                {isGenerating ? 'Generating...' : 'Refresh Recipes'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{recipe.name}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {recipe.matchedIngredients}/{recipe.totalIngredients} matched
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium text-sm mb-2">Required Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant={index < recipe.matchedIngredients ? "default" : "outline"}
                            className={index < recipe.matchedIngredients ? "bg-green-100 text-green-700" : ""}
                          >
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleChatAndCustomize(recipe)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat & Customize
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Recipes;
