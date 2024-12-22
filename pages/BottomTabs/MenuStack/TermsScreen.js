import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Chào mừng bạn đến với ứng dụng đặt và giao đồ ăn của chúng tôi!</Text>
      <Text style={styles.text}>
        Trước khi sử dụng dịch vụ, vui lòng đọc kỹ các điều khoản và dịch vụ dưới đây. Khi bạn truy cập và sử dụng ứng dụng, 
        điều đó đồng nghĩa với việc bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản này.
      </Text>

      <Text style={styles.subHeader}>1. Dịch vụ cung cấp</Text>
      <Text style={styles.text}>
        Ứng dụng của chúng tôi cung cấp nền tảng cho khách hàng đặt món ăn và giao hàng từ nhà hàng. 
        Tất cả các đơn hàng được thực hiện thông qua ứng dụng sẽ tuân theo thực đơn và điều kiện hiện hành của nhà hàng.
      </Text>

      <Text style={styles.subHeader}>2. Đăng ký tài khoản</Text>
      <Text style={styles.text}>
        Người dùng phải cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản. 
        Bạn có trách nhiệm bảo vệ thông tin tài khoản của mình và không chia sẻ cho bên thứ ba.
      </Text>

      <Text style={styles.subHeader}>3. Quy trình đặt hàng</Text>
      <Text style={styles.text}>
        Sau khi đặt hàng, bạn sẽ nhận được xác nhận qua ứng dụng. Chúng tôi sẽ cố gắng giao hàng đúng thời gian, 
        nhưng không chịu trách nhiệm với bất kỳ sự chậm trễ nào do yếu tố khách quan như thời tiết, giao thông hoặc các trường hợp bất khả kháng.
      </Text>

      <Text style={styles.subHeader}>4. Thanh toán</Text>
      <Text style={styles.text}>
        Người dùng có thể thanh toán qua các phương thức được hỗ trợ trong ứng dụng, bao gồm tiền mặt, thẻ ngân hàng, hoặc ví điện tử. 
        Giá cả hiển thị trên ứng dụng đã bao gồm thuế và phí dịch vụ, nếu có.
      </Text>

      <Text style={styles.subHeader}>5. Hủy đơn và hoàn tiền</Text>
      <Text style={styles.text}>
        Bạn có thể hủy đơn hàng trước khi nhà hàng xác nhận. Đối với các đơn hàng đã xác nhận, việc hủy đơn sẽ tuân theo chính sách riêng và có thể phát sinh phí hủy. 
        Việc hoàn tiền, nếu có, sẽ được xử lý trong vòng 7 ngày làm việc.
      </Text>

      <Text style={styles.subHeader}>6. Quyền và trách nhiệm</Text>
      <Text style={styles.text}>
        Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu phát hiện hành vi gian lận hoặc vi phạm điều khoản. 
        Chúng tôi không chịu trách nhiệm về chất lượng món ăn do nhà hàng cung cấp nhưng sẽ hỗ trợ bạn giải quyết các khiếu nại một cách hợp lý.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
});
