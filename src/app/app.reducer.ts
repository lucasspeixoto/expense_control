import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';

import * as fromUi from './shared/store/ui/ui.reducer';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromIncomeExpense from './incomes-expenses/store/income-expense.reducer';
export interface AppState {
	ui: fromUi.UiState;
	auth: fromAuth.AuthState;
	incomeExpense: fromIncomeExpense.IncomeExpenseState;
}

export const reducers: ActionReducerMap<AppState> = {
	ui: fromUi.uiReducer,
	auth: fromAuth.authReducer,
	incomeExpense: fromIncomeExpense.incomeExpenseReducer,
};

//* Selectors
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getUserData);

export const getIncomeExpenseState =
	createFeatureSelector<fromIncomeExpense.IncomeExpenseState>('incomeExpense');
export const getIncomeExpensesData = createSelector(
	getIncomeExpenseState,
	fromIncomeExpense.getIncomeExpenseData,
);
