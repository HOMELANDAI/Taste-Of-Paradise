# Firestore Structure

```text
establishments/{establishmentId}
recipes/{recipeId}
liveEpisodes/{episodeId}
ingredientVotingSessions/{sessionId}
tasteTesterQueue/{queueId}
sponsors/{sponsorId}
collectibleCards/{cardId}
users/{userId}
loyaltyEvents/{eventId}
ncrdGatewayContent/{contentId}
```

Live episode fields: title, status, currentStage, stageProgress, heatVotes, caramelizationPercent, selectedRecipeId, activeVotingSessionId, streamUrl, sponsorId, cookbookUnlockStatus.

Recipe fields: establishmentId, title, collection, category, mealType, ingredients, instructions, status, visibility, heatScore, voteCount, sponsorId, collectibleCardId.
