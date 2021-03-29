import React, {useEffect, useState} from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');
const ColorTheme = 'rgb(184, 55, 55)';
const ColorTheme1 = "rgb(184, 55, 55)"
var IconItemMail = [

  {
    name: 'email',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },

]

var IconItemPhone = [
  {
    name: 'phone',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },

]
var IconItemLink = [
  {
    name: 'facebook',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'google-play',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'youtube',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'telegram',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },

  {
    name: 'github',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },

  {
    name: 'soundcloud',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'twitter',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'linkedin',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'google-drive',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'web',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'instagram',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
  {
    name: 'dots-horizontal-circle',
    color: ColorTheme1,
    type: 'material-community',
    size: 30,
  },
];
const CreateAlert = (content) =>
    Alert.alert(
      "Notification",
      `${content}`,
      [
        { text: "OK", onPress: () => {} }
      ],
      { 
        cancelable: true 
      }
);
const ItemCreate = ({name_icon, color,typeIcon,size}) => (
  <View style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
    <Icon name={name_icon} size={size} type={typeIcon} color={color}></Icon>
  </View>
);
import {Button} from 'react-native-elements';
const Add = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setname] = useState('');
  const [link, setlink] = useState('');
  const [r, setr] = useState(0);
  const [type, settype] = useState(0);
  const [typeTextInput, settypetextInput] = useState('Enter the link')
  return (
    <SafeAreaView>
      <View
        style={{
          height: 65  ,
          backgroundColor: "white",
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
      <ImageBackground 
          source = {require('../img/btnbackground.png')}
          style = {styles.header}
      >
          <Text style={{textAlign: 'right', fontSize: 20, color:"white", fontWeight:"bold",marginTop:27, marginRight:25,}}>
              ADD KEY NAME
          </Text>
      </ImageBackground>
      </View>
      

      <ScrollView style={styles.container}>
        <View style={{height: 30}}></View>
        <View style={styles.contain_textinput}>
          <View style = {{backgroundColor:"rgb(184, 55, 55)",marginHorizontal:35,borderRadius: 6}}>
            <TextInput
              style={styles.input}
              onChangeText={setname}
              value={name}
              placeholder="Key name "
              placeholderTextColor="#969696"></TextInput>

          </View>
          <View style={{height: 20}}></View>
          <View style = {{backgroundColor:"#22bdb5",marginHorizontal:35,borderRadius: 6}}>
            <TextInput
              style={styles.input}
              onChangeText={setlink}
              value={link}
              placeholder= {typeTextInput}
              placeholderTextColor="#969696"></TextInput>

          </View>
          <View style={{height: 40}}></View>
          <View style = {styles.Option3}>
              <TouchableNativeFeedback
                onPress = {()=>{
                    settypetextInput("Enter the link")
                    settype(0)
                  
                }}
              >
                <View style = {type===0? styles.BtnOption3: styles.BtnOption3Off}>
                 <Text style = {{fontSize: 17, fontWeight: 'bold', textAlign: 'center',color:'white'}}>Link</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress = {()=>{
                    settypetextInput("Enter the email")
                    settype(1)
                    setr(0)
                }}
              >
                <View style = {type===1? styles.BtnOption3: styles.BtnOption3Off}>
                 <Text style = {{fontSize: 17, fontWeight: 'bold', textAlign: 'center',color:'white'}}>Email</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress = {()=>{
                    settypetextInput("Enter the phone number")
                    settype(2)
                    setr(0)
                }}
              >
                <View style = {type===2? styles.BtnOption3: styles.BtnOption3Off}>
                  <Text style = {{fontSize: 17, fontWeight: 'bold', textAlign: 'center',color:'white'}}>Phone</Text>
                </View>
              </TouchableNativeFeedback>
          </View>

          <View style={{height: 40}}></View>
          {type==0 &&
            <View style={styles.listBtn}>
              {IconItemLink.map((item, index)  => (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => {
                    setr(index);
                  }}>
                  <View
                    style={index == r ? styles.BoxActive : styles.BoxUnActive}>
                    <ItemCreate
                      name_icon={item.name}
                      color={item.color}
                      typeIcon = {item.type}
                      size = {item.size}
                      ></ItemCreate>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          } 
          {type==1 && 
            <View style={styles.listBtn}>
              {IconItemMail.map((item, index)  => (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => {
                    setr(index);
                  }}>
                  <View
                    style={index == r ? styles.BoxActive : styles.BoxUnActive}>
                    <ItemCreate
                      name_icon={item.name}
                      color={item.color}
                      typeIcon = {item.type}
                      size = {item.size}
                    ></ItemCreate>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          } 
          {type==2 &&
            <View style={styles.listBtn}>
              {IconItemPhone.map((item, index)  => (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => {
                    setr(index);
                  }}>
                  <View
                    style={index == r ? styles.BoxActive : styles.BoxUnActive}>
                    <ItemCreate
                      name_icon={item.name}
                      color={item.color}
                      typeIcon = {item.type}
                      size = {item.size}
                    ></ItemCreate>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          } 
      


          <View style={styles.Btn}>
            <Button
              icon={
                <Icon
                  name="plus"
                  size={35}
                  type="evilicon"
                  color="#ffffff"></Icon>
              }
              title="ADD DATA"
              onPress={() => {
                if (link === '' || name === '') {
                  route.params.setcontent("Please enter enough infomation")
                  route.params.setOK(!route.params.alrtOK)
                }
                // CreateAlert("Please enter enough information");
                else {
                  var tmp;
                  if (type==1) {
                    tmp =  'mailto:'+ link + '|' + IconItemMail[r].name + '|' + IconItemMail[r].color + '|' +IconItemMail[r].type + '|' + IconItemMail[r].size;
              
                  } else if (type==2) {
                    tmp =  'tel:'+ link + '|' + IconItemPhone[r].name + '|' + IconItemPhone[r].color + '|' + IconItemPhone[r].type + '|' + IconItemPhone[r].size;
                  } else{
                    tmp =  link + '|' + IconItemLink[r].name + '|' + IconItemLink[r].color +'|' +IconItemLink[r].type+ '|' + IconItemLink[r].size;
                  }
            
                  route.params.saveArticle(name, tmp);
                  setname(''); 
                  setlink('');
                }
              }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: [ColorTheme, ColorTheme],
                start: {x: 0, y: 1},
                end: {x: 1, y: 0.5},
              }}
            />
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
    display: 'flex',
    justifyContent: 'center',
    height: 75,
  },
  container: {},
  contain_textinput: {
    flexDirection: 'column',
  },
  input: {
    textAlign: 'left',
    height: 50,
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: '200',
    color: ColorTheme,
    borderRadius: 4,
    borderBottomRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 5,
    elevation: 5,
  },
  Btn: {
    marginTop: 50,
    paddingHorizontal: 40,
  },
  listBtn: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  BoxActive: {
    height: 60,
    width: 60,
    borderColor: '#d45050',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  BoxUnActive: {
    height: 60,
    width: 60,
    borderColor: '#d4d4d4',
    borderWidth: 2,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  BtnAdd: {
    backgroundColor: 'red',
  },
  Option3:{
    flexDirection:'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnOption3:{
    marginHorizontal: 5,
    width: 80,
    backgroundColor: ColorTheme,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  BtnOption3Off:{
    marginHorizontal: 5,
    width: 80,
    backgroundColor: "#7d7d7d",
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  }
});

export default Add;
