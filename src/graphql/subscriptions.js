/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInstructions = /* GraphQL */ `
  subscription OnCreateInstructions(
    $filter: ModelSubscriptionInstructionsFilterInput
  ) {
    onCreateInstructions(filter: $filter) {
      id
      instruction
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInstructions = /* GraphQL */ `
  subscription OnUpdateInstructions(
    $filter: ModelSubscriptionInstructionsFilterInput
  ) {
    onUpdateInstructions(filter: $filter) {
      id
      instruction
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInstructions = /* GraphQL */ `
  subscription OnDeleteInstructions(
    $filter: ModelSubscriptionInstructionsFilterInput
  ) {
    onDeleteInstructions(filter: $filter) {
      id
      instruction
      createdAt
      updatedAt
    }
  }
`;
export const onCreateIngredients = /* GraphQL */ `
  subscription OnCreateIngredients(
    $filter: ModelSubscriptionIngredientsFilterInput
  ) {
    onCreateIngredients(filter: $filter) {
      id
      ingredient
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateIngredients = /* GraphQL */ `
  subscription OnUpdateIngredients(
    $filter: ModelSubscriptionIngredientsFilterInput
  ) {
    onUpdateIngredients(filter: $filter) {
      id
      ingredient
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteIngredients = /* GraphQL */ `
  subscription OnDeleteIngredients(
    $filter: ModelSubscriptionIngredientsFilterInput
  ) {
    onDeleteIngredients(filter: $filter) {
      id
      ingredient
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onCreateRecipe(filter: $filter, owner: $owner) {
      id
      name
      ingredients {
        id
        ingredient
        createdAt
        updatedAt
      }
      prepTime
      instructions {
        id
        instruction
        createdAt
        updatedAt
      }
      userId
      userName
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onUpdateRecipe(filter: $filter, owner: $owner) {
      id
      name
      ingredients {
        id
        ingredient
        createdAt
        updatedAt
      }
      prepTime
      instructions {
        id
        instruction
        createdAt
        updatedAt
      }
      userId
      userName
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onDeleteRecipe(filter: $filter, owner: $owner) {
      id
      name
      ingredients {
        id
        ingredient
        createdAt
        updatedAt
      }
      prepTime
      instructions {
        id
        instruction
        createdAt
        updatedAt
      }
      userId
      userName
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
