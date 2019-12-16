import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id, navigation }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));
  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;
  if (amount > stockAmount) {
    Alert.alert('Fora de estoque', 'Quantidade insuficiente no estoque', [
      { text: 'OK' },
    ]);
    return;
  }

  if (productExist) {
    yield put(updateAmountSuccess(productExist.id, amount));
  }
  // vai interceptar o botão adicionar carrinho do usuário
  // utilia o metodo call do saga que é a func que realiza chamada a api
  const response = yield call(api.get, `/products/${id}`);

  // put é a func que faz chamada a actions
  if (!productExist) {
    navigation.navigate('Cart');
    yield put(addToCartSuccess(response.data));
    
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const currentAmount = stock.data.amount;
  if (amount > currentAmount) {
    Alert.alert('Fora de estoque', 'Quantidade insuficiente no estoque', [
      { text: 'OK' },
    ]);
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// all - cadastrar vários listeners para escutar actions
// takeLatest é o metodo que pega apenas a ultima requisição, se por exemplo o usuário clicar várias vezes rapido num botão
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
