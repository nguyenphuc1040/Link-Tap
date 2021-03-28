import React, {useEffect, useState} from 'react';

import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacityBase,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  Touchable,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import 'react-native-gesture-handler';
import {StackActions} from '@react-navigation/routers';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import QrCode from 'react-native-qrcode-svg';
import QRCode from 'react-native-qrcode-svg';
import {color} from 'react-native-reanimated';


const {width, height} = Dimensions.get('screen');
const ColorTheme = '#b73636';
const CreateAlert = content =>
  Alert.alert('Notification', `${content}`, [{text: 'OK', onPress: () => {}}], {
    cancelable: true,
  });
const InfoBtn = ({
  name,
  name_icon,
  color_icon,
  link,
  type,
  size,
  arr,
  index,
  setarr,
  Qrcodevs,
  setQRvisible,
  setlink,
  alrtOK,
  setOK,
  alrtDelete,
  setDelete,
  setcontent,
  setnameDelete,
  setindexnamedelete,

}) => (
  <TouchableNativeFeedback
    onPress={() => {
      setlink(link);
      setQRvisible(!Qrcodevs);
    }}
    onLongPress={() => {
      Vibration.vibrate(70)
      setcontent("Delete this Item ?");
      setnameDelete(name);
      setindexnamedelete(index);
      setDelete(!alrtDelete);
    }}>
    <View
      style={styles.InfoBtnContainer}>
      <ImageBackground
        imageStyle = {{borderBottomRightRadius: 30,borderRadius:3}}
        source = {require('../img/btnbackground.png')}
        style={styles.InfoBtnInterface}>
        <View style={styles.IconContainer}>
          <Icon
            name={name_icon}
            size={size}
            type={type}
            color={color_icon}></Icon>
        </View>
        <Text style={styles.InfoBtnTexts}>{name}</Text>
      </ImageBackground>
      
    </View>
  </TouchableNativeFeedback>
);

const deleteItem = async (key,alrtOK,setOK, index) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    setcontent("Please Try Again");
    setOK(!alrtOK);   
  }
};
const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [arr, setarr] = useState([]);
  const [link, setlink] = useState('');
  const saveArticle = async (key, value) => {
    try {
      const vl = await AsyncStorage.getItem(key);
      if (vl == null) {
        await AsyncStorage.setItem(key, value);
        setarr([...arr, [key, value]]);
        setcontent("Successfull !");
        setOK(!alrtOK);
        navigation.goBack();
      } else {
        setcontent("Key Name Exists");
        setOK(!alrtOK);
      }
    } catch (e) {
        setcontent("Please Try Again");
        setOK(!alrtOK);   
    }
  };
  const getAllData = () => {
    AsyncStorage.getAllKeys().then(keys => {
      return AsyncStorage.multiGet(keys)
        .then(result => {
          setarr(result);
        })
        .catch(e => {
          setcontent("Please Try Again");
          setOK(!alrtOK);   
        });
    });
  };
  const [Qrcodevs, setQRvisible] = useState(false);
  const [alrtDelete, setDelete] = useState(false);
  const [alrtOK, setOK] = useState(false);
  const [alrtcontent,setcontent] = useState('');
  const [nameDelete,setnameDelete] = useState('');
  const [indexnameDelete,setindexnamedelete] = useState();
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle='light-content' translucent={true}></StatusBar>
   
      <Modal
        animationType="fade"
        transparent={true}
        visible={Qrcodevs}
        onRequestClose={() => {
              setQRvisible(!Qrcodevs)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.Coating}></View>
          <View style={styles.modalView}>
            <QRCode 
              value={link} 
              color= "#158a96"
              size={width / 2.5}
         
              backgroundColor = "white"
            ></QRCode>
          </View>
          <View style ={{marginTop:20}}></View>
          <TouchableOpacity style={styles.shawdowst} onPress={() => setQRvisible(!Qrcodevs)}>
            <Icon
              name="times-circle"
              size={60}
              type="font-awesome"
              color="#ffffff"></Icon>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {alrtOK}
        onRequestClose={()=>{
          
        }}
      >
        <View style={styles.centeredView}>
             <View style={styles.Coating}></View>
             <View style={styles.modalViewAlert}>
                <Text style={{fontSize:24, fontWeight:'bold',color:"#5e5e5e"}}> Notification </Text>
                <Text style = {{fontSize:17, fontWeight:'normal',color:"#5e5e5e",marginTop:10}}> {alrtcontent} </Text>
                <TouchableOpacity 
                  activeOpacity ={.7}
                  onPress={() => setOK(!alrtOK)}>
                  <View style ={styles.BtnOK}>
                      <Text style = {styles.TextBtnOk}>
                        OK
                      </Text>
                  </View>
                </TouchableOpacity>
             </View>
        </View>
      </Modal>
      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {alrtDelete}
        onRequestClose={()=>{
          
        }}
      >
        <View style={styles.centeredView}>
             <View style={styles.Coating}></View>
             <View style={styles.modalViewAlert}>
                <Text style={{fontSize:24, fontWeight:'bold',color:"#5e5e5e"}}> Notification </Text>
                <Text style = {{fontSize:17, fontWeight:'normal',color:"#5e5e5e",marginTop:10}}> {alrtcontent} </Text>
                <View style = {{flexDirection:"row"}}>
                    <TouchableOpacity 
                      activeOpacity ={.7}
                      onPress={() => setDelete(!alrtDelete)}>
                      <View style ={styles.BtnCancel}>
                          <Text style = {styles.TextBtnOk}>
                            Cancel
                          </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      activeOpacity ={.7}
                      onPress={() =>  {
                        deleteItem(nameDelete,alrtOK,setOK); 
                        setDelete(!alrtDelete);
                        setarr([...arr.slice(0, indexnameDelete), ...arr.slice(indexnameDelete + 1)]);
                      }}>
                      <View style ={styles.BtnOK}>
                          <Text style = {styles.TextBtnOk}>
                            OK
                          </Text>
                      </View>
                    </TouchableOpacity>
                    
                </View>
                
             </View>
        </View>
      </Modal>
      <View
        style={{
          height: 70,
          backgroundColor: "white",
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <ImageBackground source = {require('../img/btnbackground.png')}
          imageStyle = {{}}
          style={{
   
            height: 75,
            
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text
            style={{
              color: '#e5e5e5',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              paddingBottom: 10,
              marginTop: 35,
              marginLeft: 23,
            }}>
            LINK TAP
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.push('Add', {saveArticle: saveArticle, setcontent: setcontent, setOK: setOK, alrtOK: alrtOK});
            }}>
            <View style={styles.AddBtn}>
              <Icon
                name="plus-circle"
                size={35}
                type="font-awesome"
                color="#ffffff"
                style={styles.IconAdd}></Icon>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>

      <ScrollView style={{paddingTop: 20}}>
        {arr.map((item, index) => (
          <InfoBtn
            name={item[0]}
            name_icon={item[1].split('|')[1]}
            color_icon={item[1].split('|')[2]}
            link={item[1].split('|')[0]}
            type = {item[1].split('|')[3]}
            size = {40}
            arr={arr}
            index={index}
            setarr={setarr}
            setQRvisible={setQRvisible}
            setlink={setlink}
            alrtOK = {alrtOK}
            setOK = {setOK}
            alrtDelete = {alrtDelete}
            setDelete = {setDelete}
            setcontent = {setcontent}
            setnameDelete = {setnameDelete}
            setindexnamedelete = {setindexnamedelete}
            key={index}></InfoBtn>
        ))}
        { arr.length===0 &&
          <Text style={{fontSize:20, fontWeight: 'bold', color:'#7a7a7a',textAlign:'center',marginTop:height/3}}>
          OPPS ! NO THING HERE
        </Text>}
        <View style={{height: 100}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: height,
  },
  InfoBtnContainer: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    height: 70,
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,


  },
  InfoBtnInterface: {
    width: width - 40,
    height: 70,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,

  },
  InfoBtnTexts: {
    marginLeft: 20,
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  IconContainer: {
    height: 70,
    width: 70,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: -5,
  },

  AddBtn: {
    justifyContent: 'center',
    height: 37,
    width: 40,
    borderRadius: 30,
    zIndex: 1,
    marginTop: -40,
    marginLeft: width - 50,
  },
  QrCode: {
    position: 'absolute',
    height: height,
    width: width,
    backgroundColor: '#000000',
    zIndex: -1,
    opacity: 0.7,
  },
  QrCodeImg: {
    backgroundColor: 'white',
    height: width / 1.5,
    width: width / 1.5,
    position: 'absolute',
    zIndex: 1,
    marginHorizontal: width / 6,
    marginVertical: height / 4,
    borderRadius: 10,
    padding: width / 7.5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  modalViewAlert: {
    width:width/1.3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 18,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Coating:{
    height: height,
    width: width,
    backgroundColor: '#000000',
    opacity: 0.7,
    position: 'absolute',
  },
  BtnOK:{
    marginTop:20,
    justifyContent:'center',
    height: 40,
    width: 100,
    backgroundColor: ColorTheme,
    borderRadius: 10,
  },
  BtnCancel:{
    marginTop:20,
    justifyContent:'center',
    height: 40,
    width: 100,
    backgroundColor: "#7d7d7d",
    borderRadius: 10,
    marginRight: 30,
  },
  TextBtnOk:{
    color: "white",
    fontSize:18, 
    fontWeight: 'bold',
    textAlign:"center",
    
  },
  shawdowst:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
