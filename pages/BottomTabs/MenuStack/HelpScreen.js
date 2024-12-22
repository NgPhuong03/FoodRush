import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function HelpScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Trợ giúp và hỗ trợ</Text>
      <Text style={styles.text}>
      Ứng dụng đặt và giao đồ ăn của chúng tôi được thiết kế để mang lại trải nghiệm thuận tiện và dễ dàng nhất cho khách hàng. Tuy nhiên, chúng tôi hiểu rằng đôi khi bạn có thể gặp khó khăn hoặc cần thêm thông tin. 
      Để đảm bảo bạn luôn nhận được sự hỗ trợ tốt nhất, chúng tôi cung cấp nhiều kênh trợ giúp và hỗ trợ linh hoạt, bao gồm:
      </Text>

      <Text style={styles.subHeader}>1. Hỗ Trợ Qua Điện Thoại:</Text>
      <Text style={styles.text}>
      Đối với những vấn đề khẩn cấp, chẳng hạn như đơn hàng bị trễ hoặc cần thay đổi quan trọng, bạn có thể gọi điện trực tiếp đến tổng đài hỗ trợ. 
      Số điện thoại hỗ trợ luôn hiển thị rõ ràng trong phần “Liên hệ chúng tôi” của ứng dụng.
      </Text>

      <Text style={styles.subHeader}>2. Gửi Yêu Cầu Trực Tuyến:</Text>
      <Text style={styles.text}>
      Trong trường hợp bạn có những phản hồi chi tiết hơn hoặc không cần giải quyết ngay lập tức, bạn có thể gửi yêu cầu hỗ trợ thông qua email:  <Text style={{ fontWeight: '500' }}>22520827@gm.uit.edu.vn</Text>  trong ứng dụng. 
      Hệ thống sẽ ghi nhận và phản hồi trong vòng 24 giờ.
      </Text>


      <Text style={styles.subHeader}>3. Theo Dõi Đơn Hàng:</Text>
      <Text style={styles.text}>
      Để giúp bạn luôn an tâm, ứng dụng cung cấp chức năng theo dõi đơn hàng theo thời gian thực. Bạn có thể biết chính xác món ăn đang được chuẩn bị, khi nào tài xế nhận hàng, và khi nào đơn hàng sẽ đến tay bạn.
      </Text>

      <Text style={styles.subHeader}>4. Chính Sách Hỗ Trợ Hoàn Tiền và Khiếu Nại</Text>
      <Text style={styles.text}>
      Nếu bạn gặp bất kỳ vấn đề nào về chất lượng món ăn hoặc dịch vụ giao hàng, hãy báo cáo ngay trong ứng dụng. Chúng tôi cam kết xử lý nhanh chóng và công bằng, 
      với chính sách hoàn tiền minh bạch để đảm bảo quyền lợi của bạn.
      </Text>

      <Text style={styles.subHeader}>5. Gợi Ý và Phản Hồi:</Text>
      <Text style={styles.text}>
      Chúng tôi luôn mong muốn cải thiện dịch vụ. Nếu bạn có bất kỳ ý tưởng hoặc góp ý nào, vui lòng gửi phản hồi qua ứng dụng. 
      Mọi ý kiến của bạn đều là động lực để chúng tôi hoàn thiện hơn.
      </Text>

      <Text style={styles.text}>
      Chúng tôi luôn đặt khách hàng làm trọng tâm và cam kết mang lại sự hài lòng cao nhất trong mỗi trải nghiệm đặt món và giao hàng. Nếu bạn cần bất kỳ hỗ trợ nào, 
      đừng ngần ngại liên hệ với chúng tôi qua số 0364997254!
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
