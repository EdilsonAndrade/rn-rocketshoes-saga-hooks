import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import api from '../../services/api';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductsList, ProductView, ProductDescription, Price, Button, TextButton, ProductImage, IconView, ProductsAdded } from './styles';
import Header from '../../components/header/index'

export default function Main({navigation}) {

  const [products, setProducts] = useState([]);
  
  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {}));

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const result = response.data.map(product => ({
        ...product,
        priceFormated: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      }));
      setProducts(result);
    }
    loadProducts();
  }, [])

  const dispatch = useDispatch();
  const handleAddToCart = async (id) => {
    

    dispatch(CartActions.addToCartRequest(id, navigation));
  }

  return (
    <Container>
      <ProductsList
        horizontal={true}
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {

          return (
            <ProductView>
              <ProductImage
                source={{ uri: item.image }}
              ></ProductImage>
              <ProductDescription>{item.title}</ProductDescription>
              <Price> {item.priceFormated}</Price>
              <Button onPress={() => handleAddToCart(item.id)}>
                <IconView>
                  <Icon name="add-shopping-cart" size={20} color='#fff' />
                  <ProductsAdded>{
                    amount[item.id] ?? 0
                  }</ProductsAdded>
                </IconView>

                <TextButton>ADICIONAR</TextButton>
              </Button>
            </ProductView>

          )

        }}
      ></ProductsList>

    </Container>
  );
}

Main.navigationOptions = {
  title: 'Rocket Shoes',
  header: ({ navigation }) => {
    return (
      <Header navigation={navigation}
      />
    );
  }
};

