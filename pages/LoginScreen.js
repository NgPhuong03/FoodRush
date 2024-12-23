import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from '../contexts/AuthContext';


export default function LoginScreen() {
  const {LogIn} = useContext(AuthContext);
  const [email, setEmail] = useState('Ml@gmail.com');
  const [password, setPassword] = useState('123123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let valid = true;

    if (!email) {
      setEmailError('Vui lòng điền email');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải trên 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const formLogin = {email: email, password: password};
      const res = await LogIn(formLogin); // Gọi hàm đăng nhập nếu mọi thứ hợp lệ
      console.log('ressss', res);
      
      if (res.code == 1003){
        setEmailError(res.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <Text style={styles.txt}>Email</Text>
        <View style={[styles.inputContainer, emailError ? {borderColor: 'red'} : null]}>
         <Icon name="envelope" size={20} color={emailError ? "red" : "black"} style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder='Nhập email'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : <Text style={styles.errorText}></Text>}
      </View>

      <View style={styles.containerChild}>
        <Text style={styles.txt}>Mật khẩu</Text>
        <View style={[styles.inputContainer, passwordError ? {borderColor: 'red'} : null]}>
          <Icon name="lock" size={27} color={passwordError ? "red" : "black"} style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder='Nhập mật khẩu'
            autoCapitalize='none'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {password.length > 0 && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "eye" : "eye-slash"} 
                size={27} 
                color="black" 
                style={styles.iconMat} 
              />
            </TouchableOpacity>
          )}
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : <Text style={styles.errorText}></Text>}
      </View>

      {/* <View style={styles.forgetContainer}>
        <TouchableOpacity style={styles.btnForget}>
          <Text style={styles.txtForget}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View> */}


      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.txtLogin}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    height: "100%",
    alignItems: 'center',
    paddingTop: 10
  },
  containerChild: {
    width: "90%",
    height: "auto",
    marginTop: 10
  },
  txt: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  input: {
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
  },
  icon: {
    marginRight: 2,
    width: "8%"
  },
  iconMat: {
    marginHorizontal: "auto"
  },
  forgetContainer: {
    width: "90%",
    alignItems: "flex-end",
    marginTop: 5
  },
  txtForget: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FA4A0C'
  },
  loginContainer: {
    backgroundColor: "#FA4A0C",
    width: "60%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 40
  },
  btn: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txtLogin: {
    fontSize: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: 'white',
    fontWeight: "700",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 3,
  },
});
