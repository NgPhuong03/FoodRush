import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signUp } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    let valid = true;

    if (!email) {
      setEmailError("Vui lòng điền email");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải trên 6 ký tự");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!name) {
      setNameError("Vui lòng nhập họ và tên");
      valid = false;
    } else {
      setNameError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Vui lòng nhập số điện thoại");
      valid = false;
    } else if (phoneNumber.length != 10) {
      setPhoneNumberError("Số điện thoại không hợp lệ");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu không khớp");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      const signupForm = {
        name: name,
        email: email,
        password: password,
        phone_number: phoneNumber
      };
      const res = await signUp(signupForm);
      if (res.code === 201 ) {
        Alert.alert("Thông báo", "Đăng ký thành công");
        setEmail("")
        setName("")
        setPhoneNumber("")
        setPassword("")
        setConfirmPassword("")
      } else if (res.code == 1001 ) {
        setEmailError(res.message);
        Alert.alert("Thông báo","Email đã tồn tại, vui lòng kiểm tra lại");
      }
      
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerChild}>
          <Text style={styles.txt}>Email</Text>
          <View
            style={[
              styles.inputContainer,
              emailError ? { borderColor: "red" } : null,
            ]}
          >
            <Icon
              name="envelope"
              size={20}
              color={emailError ? "red" : "black"}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
          )}
        </View>

        <View style={styles.containerChild}>
          <Text style={styles.txt}>Họ và tên</Text>
          <View
            style={[
              styles.inputContainer,
              nameError ? { borderColor: "red" } : null,
            ]}
          >
            <Icon
              name="user"
              size={24}
              color={nameError ? "red" : "black"}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              autoCapitalize="none"
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
          )}
        </View>


        <View style={styles.containerChild}>
          <Text style={styles.txt}>Số điện thoại</Text>
          <View
            style={[
              styles.inputContainer,
              phoneNumberError ? { borderColor: "red" } : null,
            ]}
          >
            <Icon
              name="phone"
              size={24}
              color={phoneNumberError ? "red" : "black"}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              autoCapitalize="none"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(e) => setPhoneNumber(e)}
            />
          </View>
          {phoneNumberError ? (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
          )}
        </View>

        <View style={styles.containerChild}>
          <Text style={styles.txt}>Mật khẩu</Text>
          <View
            style={[
              styles.inputContainer,
              passwordError ? { borderColor: "red" } : null,
            ]}
          >
            <Icon
              name="lock"
              size={27}
              color={passwordError ? "red" : "black"}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              autoCapitalize="none"
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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
          )}
        </View>

        <View style={styles.containerChild}>
          <Text style={styles.txt}>Nhập lại mật khẩu</Text>
          <View
            style={[
              styles.inputContainer,
              confirmPasswordError ? { borderColor: "red" } : null,
            ]}
          >
            <Icon
              name="lock"
              size={27}
              color={confirmPasswordError ? "red" : "black"}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {confirmPassword.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={27}
                  color="black"
                  style={styles.iconMat}
                />
              </TouchableOpacity>
            )}
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
          )}
        </View>

        <View style={styles.signupContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
            <Text style={styles.txtSignup}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    height: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  containerChild: {
    width: "100%",
    height: "auto",
    marginTop: 10,
  },
  txt: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
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
    width: "8%",
  },
  iconMat: {
    marginHorizontal: "auto",
  },
  forgetContainer: {
    width: "90%",
    alignItems: "flex-end",
    marginTop: 20,
  },
  txtForget: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FA4A0C",
  },
  signupContainer: {
    backgroundColor: "#FA4A0C",
    width: "60%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
    alignSelf: "center"
  },
  btn: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txtSignup: {
    fontSize: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 3,
  },
});
