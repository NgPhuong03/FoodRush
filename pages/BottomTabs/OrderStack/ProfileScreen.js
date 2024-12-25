import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Image } from 'expo-image';
import { getUser } from '../../../services/api';
import { useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { updateUser } from '../../../services/api';

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false)
  const [editableUserInfo, setEditableUserInfo] = useState({}); 

  const loadData = async () => {
    const response = await getUser();
    setUserInfo(response.result);
    setEditableUserInfo(response.result);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData()
  },[])

  if(isLoading){
    return(
      <View style={{
        width: "full", 
        height: "full", 
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}>
        <Image 
          source={require('../../../assets/loading.gif')} 
          style={{height: 100, width: 100}}
          contentFit="contain"
        />
      </View>
    )
  }

    // Xử lý khi nhấn nút Lưu
    const handleSave = async () => {
      try {
        const response = await updateUser(editableUserInfo);
          setUserInfo(response.result); // Cập nhật lại dữ liệu sau khi lưu thành công
          setIsEditing(false); // Thoát chế độ chỉnh sửa
          Alert.alert("Thông báo","Cập nhật thông tin thành công!");
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        setIsEditing(false);
        Alert.alert("Thông báo","Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    };
  
    // Xử lý khi nhấn nút Hủy
    const handleCancel = () => {
      setEditableUserInfo(userInfo);
      setIsEditing(false); // Thoát chế độ chỉnh sửa
    };

  return (
    <View style={styles.container}>
        <View style={styles.imgBorder}>
          <Image source={require('../../../assets/user.png')} style={styles.img}/>
        </View>

        <View style={styles.childContarner}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Họ và tên: </Text>
              <TextInput style={[styles.infoInput, {
                            backgroundColor: isEditing ? "#fff" :"#ddd",
                            color: isEditing ? "#000" :"#444",
                            fontWeight: isEditing ? "400" :"600"
                          }]}
                placeholder='Nhập họ và tên...'
                value={editableUserInfo.name}
                onChangeText={(text) =>
                  setEditableUserInfo({ ...editableUserInfo, name: text })
                }
                numberOfLines={1}
                editable={isEditing}
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Số điện thoại: </Text>
              <TextInput style={[styles.infoInput, {
                            backgroundColor: isEditing ? "#fff" :"#ddd",
                            color: isEditing ? "#000" :"#444",
                            fontWeight: isEditing ? "400" :"600"
                          }]}
                placeholder='Nhập số điện thoại...'
                value={editableUserInfo.phone_number}
                onChangeText={(text) =>
                  setEditableUserInfo({ ...editableUserInfo, phone_number: text })
                }
                numberOfLines={1}
                editable={isEditing}
                keyboardType='numeric'
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Email: </Text>
              <TextInput style={[styles.infoInput, {
                            backgroundColor: "#ddd",
                            color: "#444",
                            fontWeight: "600"
                          }]}
                placeholder='Nhập email...'
                value={editableUserInfo.email}
                onChangeText={(text) =>
                  setEditableUserInfo({ ...editableUserInfo, email: text })
                }
                numberOfLines={1}
                editable={false}
              />
            </View>

            {isEditing 
              ?(
                  <View style={{flexDirection: "row", width: "90%", justifyContent: "center"}}>
                      <Button
                        title="Hủy"
                        onPress={() => handleCancel()}
                        loading={false}
                        icon={{
                          name: "times-circle",
                          color: "#0099FF",
                          size: 20,
                          type: "font-awesome"
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={{
                          backgroundColor: 'white',
                          borderRadius: 15,
                          borderWidth: 1
                        }}
                        containerStyle={{
                          width: "40%",
                          marginVertical: 5,
                          marginEnd: 5
                        }}
                        titleStyle={{
                          fontSize: 18,
                          color: "#0099FF",
                          fontWeight: "700"
                        }}
                    />    
                      <Button
                        title="Lưu"
                        onPress={() => handleSave()}
                        loading={false}
                        icon={{
                          name: "save",
                          color: "white",
                          size: 20,
                          type: "font-awesome"
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={{
                          backgroundColor: '#0099FF',
                          borderRadius: 15,
                        }}
                        containerStyle={{
                          width: "40%",
                          marginVertical: 5,

                        }}
                        titleStyle={{
                          fontSize: 18,
                          fontWeight: "700"
                        }}
                    />                                       
                  </View>
                )
              : (
                <View style={{flexDirection: "row", width: "90%", justifyContent: "center"}}>
                    <Button
                      title="Chỉnh sửa"
                      onPress={() => {
                        loadData()
                        setIsEditing(true)
                      }}
                      loading={false}
                      icon={{
                        name: "edit",
                        color: "white",
                        size: 20,
                        type: "font-awesome"
                      }}
                      iconContainerStyle={{ marginRight: 10 }}
                      buttonStyle={{
                        backgroundColor: '#fa4a0c',
                        borderRadius: 15,
                      }}
                      containerStyle={{
                        width: "45%",
                        marginVertical: 5,

                      }}
                      titleStyle={{
                        fontSize: 18,
                        fontWeight: 600
                      }}
                  />  
                </View>            
              )
            }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250, 74, 12, 0.1)",
    alignItems: 'center',
    justifyContent: "space-between",
  },
  img: {
    width: 72,
    height: 72,
  },
  imgBorder: {
    width: 84,
    height: 84,
    borderWidth: 2,
    borderRadius: 42,
    borderColor: '#fa4a0c',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: "auto"
  }, 
  childContarner: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20

  },
  infoContainer: {
    width: "90%",
    padding: 5,
    marginVertical: 5
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.8)"
  },
  infoInput: {
    borderWidth: 1,
    marginVertical: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 18,
    borderRadius: 10,
    borderColor: "#000",
    borderStyle: "solid",
  }

});
