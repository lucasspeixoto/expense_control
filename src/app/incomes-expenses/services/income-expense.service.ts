import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

//* NgRx
import { Store } from '@ngrx/store';

//* Redux
import * as UI from '../../shared/store/ui/ui.actions';
import * as AUTH from '../../auth/store/auth.actions';
import * as fromRoot from '../../app.reducer';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from 'src/app/auth/services/auth.service';

//* Mensagens
import Swal from 'sweetalert2';
import { Title, Text } from '../../shared/messages/errors';

@Injectable({
	providedIn: 'root',
})
export class IncomeExpenseService {
	constructor(
		private angularFirestore: AngularFirestore,
		private store: Store<fromRoot.AppState>,
		private authService: AuthService,
	) {}

	createIncomeOrExpense(item: IncomeExpense) {
		this.store.dispatch(UI.StartLoading());
		const userId = this.authService.user.userId;
		this.angularFirestore
			.collection(`users/${userId}/incomes-expenses`)
			.add({ ...item })
			.then(() => {
				this.store.dispatch(UI.StopLoading());
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Item Criado',
					text: `O item '${item.description}' foi criado com sucesso`,
				});
			})
			.catch(error => {
				this.store.dispatch(UI.StopLoading());
				Swal.fire({
					icon: 'error',
					title: `Erro na criação do item - ${error.code}`,
					text: `Tente novamente, caso o erro pesista contate o administrador`,
				});
			});
	}
}