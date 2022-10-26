import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {createAppContainer, NavigationEvents} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Input} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select/src';
class PantallaInicio extends React.Component {
  state = {
    usuario: '',
    contrasena: '',
  };
  static navigationOptions = {
    headerShown: false,
  };
  Entrar() {
    if (!!this.state.usuario && !!this.state.contrasena) {
      fetch(
        'https://candent-summer.000webhostapp.com/apiusuario2.php?comando=autenticar&usuario=' +
          this.state.usuario +
          '&contrasena=' +
          this.state.contrasena,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          const encontrado = responseJson.encontrado;
          // Alert("Mensaje="+mensaje);
          console.log(encontrado);
          if (encontrado === 'si') {
            this.props.navigation.navigate('ListarClientesT');
          } else {
            Alert.alert(
              'Usuario',
              'No encontrado!!',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert(
            'Aviso',
            'Error de Internet!!',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        });
    } else {
      Alert.alert(
        'Aviso',
        'No introdujo datos',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }
  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 34, marginTop: 25, alignSelf: 'center'}}>
          Bienvenidos
        </Text>
        <Image
          style={{width: 200, height: 160, alignSelf: 'center', marginTop: 15}}
          source={require('./imagenes/logo.jpg')}
        />
        <View style={styles.login}>
          <Input
            placeholder="USUARIO"
            onChangeText={text => this.setState({usuario: text})}
            rightIcon={<Image source={require('./imagenes/user.png')} />}
          />
          <Input
            placeholder="CONTRASEÑA"
            onChangeText={text => this.setState({contrasena: text})}
            secureTextEntry={true}
            rightIcon={<Image source={require('./imagenes/lock.png')} />}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.Entrar();
          }}>
          <Text style={styles.indi}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class listarClientesT extends React.Component {
  state = {
    elementos: [],
  };
  static navigationOptions = {
    title: 'Clientes',
    headerStyle: {
      backgroundColor: '#E6E347',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  cargarRegistros() {
    fetch('https://candent-summer.000webhostapp.com/api2.php?comando=listar', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => {
            // Do your things here
            this.cargarRegistros();
          }}
        />
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesT');
            }}>
            <Text style={styles.indi}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesR');
            }}>
            <Text style={styles.indi}>Reales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesP');
            }}>
            <Text style={styles.indi}>Posibles</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.elementos}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              //onPress = {() => this.alertItemName(item)}
              onPress={() => this.props.navigation.navigate('Detalles', item)}>
              <View style={styles.listar}>
                <View style={{height: '15%', marginLeft: '3%'}}>
                  <Text style={{flex: 1, fontSize: 18}}>
                    {item.nombres} {item.apellidos}
                  </Text>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Tipo: {item.tipo}
                  </Text>
                  <Text style={styles.detail}>Email: {item.email}</Text>
                  <Text style={styles.detail}>Tel: {item.tel}</Text>
                  <Text style={styles.detail}>Dirección: {item.direcc_po}</Text>
                  <Text style={styles.detail}>Intereses: {item.intereses}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => this.props.navigation.navigate('Agregar')}>
          <Image source={require('./imagenes/add.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
class listarClientesR extends React.Component {
  state = {
    elementos: [],
  };
  static navigationOptions = {
    title: 'Clientes',
    headerStyle: {
      backgroundColor: '#E6E347',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  cargarRegistros() {
    fetch('https://candent-summer.000webhostapp.com/api2.php?comando=listar2', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => {
            // Do your things here
            this.cargarRegistros();
          }}
        />
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesT');
            }}>
            <Text style={styles.indi}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesR');
            }}>
            <Text style={styles.indi}>Reales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesP');
            }}>
            <Text style={styles.indi}>Posibles</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.elementos}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              //onPress = {() => this.alertItemName(item)}
              onPress={() => this.props.navigation.navigate('Detalles', item)}>
              <View style={styles.listar}>
                <View style={{height: '15%', marginLeft: '3%'}}>
                  <Text style={{flex: 1, fontSize: 18}}>
                    {item.nombres} {item.apellidos}
                  </Text>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Tipo: {item.tipo}
                  </Text>
                  <Text style={styles.detail}>Email: {item.email}</Text>
                  <Text style={styles.detail}>Tel: {item.tel}</Text>
                  <Text style={styles.detail}>Dirección: {item.direcc_po}</Text>
                  <Text style={styles.detail}>Intereses: {item.intereses}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => this.props.navigation.navigate('Agregar')}>
          <Image source={require('./imagenes/add.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
class listarClientesP extends React.Component {
  state = {
    elementos: [],
  };
  static navigationOptions = {
    title: 'Clientes',
    headerStyle: {
      backgroundColor: '#E6E347',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  cargarRegistros() {
    fetch('https://candent-summer.000webhostapp.com/api2.php?comando=listar3', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => {
            // Do your things here
            this.cargarRegistros();
          }}
        />
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesT');
            }}>
            <Text style={styles.indi}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesR');
            }}>
            <Text style={styles.indi}>Reales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butto}
            onPress={() => {
              this.props.navigation.navigate('ListarClientesP');
            }}>
            <Text style={styles.indi}>Posibles</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.elementos}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              //onPress = {() => this.alertItemName(item)}
              onPress={() => this.props.navigation.navigate('Detalles', item)}>
              <View style={styles.listar}>
                <View style={{height: '15%', marginLeft: '3%'}}>
                  <Text style={{flex: 1, fontSize: 18}}>
                    {item.nombres} {item.apellidos}
                  </Text>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Tipo: {item.tipo}
                  </Text>
                  <Text style={styles.detail}>Email: {item.email}</Text>
                  <Text style={styles.detail}>Tel: {item.tel}</Text>
                  <Text style={styles.detail}>Dirección: {item.direcc_po}</Text>
                  <Text style={styles.detail}>Intereses: {item.intereses}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => this.props.navigation.navigate('Agregar')}>
          <Image source={require('./imagenes/add.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
class PaginaDetalle extends React.Component {
  state = {
    nombres: '',
    apellidos: '',
    tipo: '',
    direcc_po: '',
    direcc_trab: '',
    tel: '',
    email: '',
    nivel: '',
    shop: '',
    intereses: '',
    id: '',
  };
  static navigationOptions = {
    title: 'Editar cliente',
    headerStyle: {
      backgroundColor: '#E6E347',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  Actualizar() {
    fetch(
      'https://candent-summer.000webhostapp.com/api2.php?comando=editar&nombres=' +
        this.state.nombres +
        '&apellidos=' +
        this.state.apellidos +
        '&tipo=' +
        this.state.tipo +
        '&direcc_po=' +
        this.state.direcc_po +
        '&direcc_trab=' +
        this.state.direcc_trab +
        '&tel=' +
        this.state.tel +
        '&email=' +
        this.state.email +
        '&nivel=' +
        this.state.nivel +
        '&shop=' +
        this.state.shop +
        '&intereses=' +
        this.state.intereses +
        '&id=' +
        this.state.id,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('Error al actualizar!');
        } else {
          alert(mensaje);
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error de Internet!!');
      });
  }
  Eliminar() {
    fetch(
      'https://candent-summer.000webhostapp.com/api2.php?comando=eliminar&id=' +
        this.state.id,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('Error al eliminar!');
        } else {
          alert(mensaje);
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error de Internet!!');
      });
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              height: 60,
            }}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.Actualizar();
              }}>
              <Text style={styles.text}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.Eliminar();
              }}>
              <Text style={styles.text}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, padding: 20}}>
            <NavigationEvents
              onWillFocus={() => {
                // Do your things here
                console.log('Entro aqui' + navigation.getParam('nombre'));
                this.setState({
                  nombres: navigation.getParam('nombres'),
                  apellidos: navigation.getParam('apellidos'),
                  tipo: navigation.getParam('tipo'),
                  direcc_po: navigation.getParam('direcc_po'),
                  direcc_trab: navigation.getParam('direcc_trab'),
                  tel: navigation.getParam('tel'),
                  email: navigation.getParam('email'),
                  nivel: navigation.getParam('nivel'),
                  shop: navigation.getParam('shop'),
                  intereses: navigation.getParam('intereses'),
                  id: navigation.getParam('id'),
                });
              }}
            />
            <Input
              label="Nombres"
              value={this.state.nombres}
              placeholder="Nombres"
              onChangeText={text => this.setState({nombres: text})}
            />
            <Input
              label="Apellidos"
              value={this.state.apellidos}
              inputStyle={styles.inputs}
              placeholder="Apellidos"
              onChangeText={text => this.setState({apellidos: text})}
            />
            <Input
              label="Tipo"
              value={this.state.tipo}
              inputStyle={styles.inputs}
              placeholder="Tipo"
              onChangeText={text => this.setState({tipo: text})}
            />
            <Input
              label="Dirección"
              value={this.state.direcc_po}
              inputStyle={styles.inputs}
              placeholder="Dirección"
              onChangeText={text => this.setState({direcc_po: text})}
            />
            <Input
              label="Dirección de trabajo"
              value={this.state.direcc_trab}
              inputStyle={styles.inputs}
              placeholder="Dirección"
              onChangeText={text => this.setState({direcc_trab: text})}
            />
            <Input
              label="Telefono"
              value={this.state.tel}
              inputStyle={styles.inputs}
              placeholder="Telefono"
              onChangeText={text => this.setState({tel: text})}
            />
            <Input
              label="Email"
              value={this.state.email}
              inputStyle={styles.inputs}
              placeholder="Email"
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              label="Nivel"
              value={this.state.nivel}
              inputStyle={styles.inputs}
              placeholder="Nivel"
              onChangeText={text => this.setState({nivel: text})}
            />
            <Input
              label="Compras"
              value={this.state.shop}
              inputStyle={styles.inputs}
              placeholder="Compras"
              onChangeText={text => this.setState({shop: text})}
            />
            <Input
              label="Intereses"
              value={this.state.intereses}
              inputStyle={styles.inputs}
              placeholder="Intereses"
              onChangeText={text => this.setState({intereses: text})}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
class PaginaAgregar extends React.Component {
  state = {
    nombres: '',
    apellidos: '',
    tipo: '',
    direcc_po: '',
    direcc_trab: '',
    tel: '',
    email: '',
    nivel: '',
    shop: '',
    intereses: '',
    id: '',
  };
  static navigationOptions = {
    title: 'Agregar cliente',
    headerStyle: {
      backgroundColor: '#E6E347',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  Guardar() {
    fetch(
      'https://candent-summer.000webhostapp.com/api2.php?comando=agregar&nombres=' +
        this.state.nombres +
        '&apellidos=' +
        this.state.apellidos +
        '&tipo=' +
        this.state.tipo +
        '&direcc_po=' +
        this.state.direcc_po +
        '&direcc_trab=' +
        this.state.direcc_trab +
        '&tel=' +
        this.state.tel +
        '&email=' +
        this.state.email +
        '&nivel=' +
        this.state.nivel +
        '&shop=' +
        this.state.shop +
        '&intereses=' +
        this.state.intereses,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('Error al agregar!');
        } else {
          alert(mensaje);
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error de Internet!!');
      });
  }
  render() {
    return (
      <ScrollView style={{flex: 1, padding: 20}}>
        <Input
          placeholder="Nombres"
          onChangeText={text => this.setState({nombres: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Apellidos"
          onChangeText={text => this.setState({apellidos: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Tipo"
          onChangeText={text => this.setState({tipo: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Dirección"
          onChangeText={text => this.setState({direcc_po: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Direccion de Trabajo"
          onChangeText={text => this.setState({direcc_trab: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Telefono"
          onChangeText={text => this.setState({tel: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Nivel"
          onChangeText={text => this.setState({nivel: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Compras"
          onChangeText={text => this.setState({shop: text})}
        />
        <Input
          inputStyle={styles.inputs}
          placeholder="Intereses"
          onChangeText={text => this.setState({intereses: text})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.Guardar();
          }}>
          <Text style={styles.indi}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Inicio: PantallaInicio,
    ListarClientesT: listarClientesT,
    ListarClientesR: listarClientesR,
    ListarClientesP: listarClientesP,
    Detalles: PaginaDetalle,
    Agregar: PaginaAgregar,
  },
  {
    initialRouteName: 'Inicio',
  },
);
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#809E34',
    marginTop: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  butto: {
    height: 50,
    backgroundColor: '#809E34',
    marginTop: 15,
    borderRadius: 5,
    justifyContent: 'center',
    width: '30%',
  },
  listar: {
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: 2,
  },
  login: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: '10%',
  },
  add: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#FAEBA7',
    borderRadius: 100,
  },
  inputs: {
    marginTop: 10,
  },
  indi: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 3,
  },
  button2: {
    flex: 1,
    height: 40,
    backgroundColor: '#809E34',
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 5,
  },
  detail: {
    flex: 1,
    fontSize: 14,
  },
  box: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '10%',
    padding: 0,
  },
});
