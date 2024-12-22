import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Chính sách bảo mật</Text>
      <Text style={styles.text}>
        Ứng dụng của chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, 
        sử dụng, và bảo vệ dữ liệu của bạn.
      </Text>

      <Text style={styles.subHeader}>1. Thu thập thông tin</Text>
      <Text style={styles.text}>
        Chúng tôi thu thập các thông tin cần thiết để cung cấp dịch vụ, bao gồm: tên, số điện thoại, địa chỉ giao hàng, và thông tin thanh toán. 
        Các thông tin này được cung cấp trực tiếp bởi bạn khi sử dụng ứng dụng.
      </Text>

      <Text style={styles.subHeader}>2. Sử dụng thông tin</Text>
      <Text style={styles.text}>
        Thông tin cá nhân của bạn sẽ được sử dụng cho các mục đích:
      </Text>
      <Text style={styles.listItem}>- Xử lý đơn hàng và giao hàng.</Text>
      <Text style={styles.listItem}>- Liên hệ hỗ trợ khách hàng.</Text>
      <Text style={styles.listItem}>- Cải thiện trải nghiệm người dùng và phát triển dịch vụ.</Text>

      <Text style={styles.subHeader}>3. Chia sẻ thông tin</Text>
      <Text style={styles.text}>
        Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ các đối tác liên quan đến việc thực hiện dịch vụ 
        (như đơn vị giao hàng).
      </Text>

      <Text style={styles.subHeader}>4. Bảo vệ thông tin</Text>
      <Text style={styles.text}>
        Dữ liệu cá nhân của bạn được bảo vệ bằng các biện pháp bảo mật như mã hóa và tường lửa. 
        Chúng tôi cũng thường xuyên kiểm tra và nâng cấp hệ thống để đảm bảo an toàn dữ liệu.
      </Text>

      <Text style={styles.subHeader}>5. Quyền lợi của bạn</Text>
      <Text style={styles.text}>
        Bạn có quyền truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào thông qua ứng dụng. 
        Nếu có bất kỳ thắc mắc nào về quyền riêng tư, bạn có thể liên hệ với chúng tôi để được hỗ trợ.
      </Text>

      <Text style={styles.subHeader}>6. Cập nhật chính sách</Text>
      <Text style={styles.text}>
        Chính sách bảo mật này có thể được cập nhật theo thời gian. Chúng tôi sẽ thông báo cho bạn qua ứng dụng hoặc email trước khi thay đổi có hiệu lực.
      </Text>

      <Text style={styles.text}>
        Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Mọi thắc mắc hoặc góp ý, vui lòng liên hệ đội ngũ hỗ trợ khách hàng để được giải đáp.
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
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 20,
  },
});
