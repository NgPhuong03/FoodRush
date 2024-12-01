import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import * as Clipboard from "expo-clipboard";




export default function PayMethodCard(){
    const [selectedMethod, setSelectedMethod] = useState(null);

    const copyToClipboard = (text) => {
        Clipboard.setStringAsync(text);
        Alert.alert("Thông báo", "Đã sao chép số tài khoản!");
      };

    const styles = StyleSheet.create({
        container: {
          backgroundColor: selectedMethod ? "rgba(250, 74, 12, 0.05)" : "#fff",
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: selectedMethod ? "#FA4A0C" : "#ccc",
          shadowColor: "black",
            shadowOffset: {
            width: 0,
            height: 2
            },
            shadowRadius: 5,
            elevation: 5,
            shadowOpacity: 0.3,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        required: {
          color: 'red',
        },
        instruction: {
          fontSize: 14,
          color: '#FA4A0C',
          marginBottom: 8,
        },
        option: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 8,
        },
        optionText: {
          fontSize: 16,
          paddingHorizontal: 10
        },
        selectedOption: {
          borderColor: 'orange',
          backgroundColor: '#ffe4c4',
        },
        selectedText: {
          color: '#FA4A0C',
        },
        transferDetails: {
          padding: 10,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
        },
        transferTitle: {
          fontWeight: 'bold',
          marginBottom: 4,
        },
        copyButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          },
          copyText: {
            color: '#FA4A0C',
            marginLeft: 5,
          },
      });
      

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <Text style={styles.required}>*Bắt buộc</Text>
          </View>
          <Text style={styles.instruction}>Vui lòng chọn 1</Text>
    
          {/* Option: Thanh toán khi nhận hàng */}
          <TouchableOpacity
            style={[styles.option, selectedMethod === 'cash' && styles.selectedOption]}
            onPress={() => setSelectedMethod('cash')}
          >
            {selectedMethod === 'cash' 
                ?  <Icon name="check-circle-o" size={20} color={"#FA4A0C"}/>
                : <Icon name="circle-thin" size={20}/>
            }
            <Text style={[styles.optionText, selectedMethod === 'cash' && styles.selectedText]}>
              Thanh toán khi nhận hàng
            </Text>
          </TouchableOpacity>
    
          {/* Option: Chuyển khoản */}
          <TouchableOpacity
            style={[styles.option, selectedMethod === 'transfer' && styles.selectedOption]}
            onPress={() => setSelectedMethod('transfer')}
          >
            {selectedMethod === 'transfer' 
                ?  <Icon name="check-circle-o" size={20} color={"#FA4A0C"}/>
                : <Icon name="circle-thin" size={20}/>
            }
            <Text style={[styles.optionText, selectedMethod === 'transfer' && styles.selectedText]}>
              Chuyển khoản
            </Text>
          </TouchableOpacity>
    
          {/* Hiển thị chi tiết chuyển khoản */}
          {selectedMethod === 'transfer' && (
            <View style={styles.transferDetails}>
              <Text style={styles.transferTitle}>Thông tin chuyển khoản</Text>
              <Text>Ngân hàng: Vietcombank</Text>
              <View style={{ flexDirection: 'row'}}>
                    <Text style={{width: "auto", borderWidth: 1, borderColor: "#fff"}}>Số tài khoản: 7489550333999</Text>
                    <TouchableOpacity
                        style={styles.copyButton}
                        onPress={() => copyToClipboard("7489550333999")}
                    >
                        <Icon name="copy" size={16} color="#FA4A0C" />
                        <Text style={styles.copyText}>Sao chép</Text>
                    </TouchableOpacity>
             </View>
              <Text>
                Nội dung chuyển khoản: &lt;Số điện thoại đặt hàng&gt;, &lt;Địa chỉ (xã/phường)&gt;
              </Text>
            </View>
          )}
        </View>
      );
}

