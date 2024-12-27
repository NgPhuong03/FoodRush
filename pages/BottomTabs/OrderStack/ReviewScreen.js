import { View, Text, StyleSheet, FlatList, Alert} from "react-native"
import { addRatingFood, getOrderDetailById, getRatingFood } from '../../../services/api';
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import FoodCardInReview from "../../../components/Order/FoodCardInReview";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function ReviewScreen({route}){
  const navigation = useNavigation();
    const {order_id} = route.params;
    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [ratings, setRatings] = useState({})

    

    useEffect(() => {
        const loadData = async () => {
            const response = await getOrderDetailById(order_id);
            if (response){
                setFood(response.list);


                // Lấy số sao đã đánh giá từ API
                const initialRatings = {};
                for (const item of response.list) {
                    const rating = await getRatingFood(item.food.id);
                    if (rating.code == 1111){
                      initialRatings[item.food.id] = 5; // Nếu chưa có đánh giá, mặc định là 5 sao
                    } else {
                      initialRatings[item.food.id] = rating.result.star; 
                    }
                }
                setRatings(initialRatings);
            }
            setIsLoading(false)
        }
        loadData()
    },[])

    const handleRatingChange = (foodId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [foodId]: rating,
        }));
    };

    const handleGui = async () => {
        // Chuyển đổi ratings từ object sang mảng object
        const formattedRatings = Object.entries(ratings).map(([food_id, star]) => ({
            food_id: Number(food_id), // Đảm bảo food_id là số
            star,
        }));
    
        const rvData = {
            ratings: formattedRatings,
        };

        rvData.ratings.forEach( async (element) => {
          await addRatingFood(element);
        });
        Alert.alert("Đánh giá thành công","Cảm ơn bạn vì đã đánh giá món ăn");
        navigation.goBack();
        console.log(rvData.ratings);
        
    };
    
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

    if(!food){
        return(null)
    }

    return (
        <View style={styles.container}>
            {food.map((item, index) => (
                <FoodCardInReview 
                    key={index} 
                    item={item} 
                    onRatingChange={handleRatingChange}    
                    initialRating={ratings[item.food.id]} // Số sao mặc định là 5
                />
            ))}

             <Button
                      title="Gửi"
                      onPress={() => {
                        handleGui()
                      }}
                      loading={false}
                      icon={{
                        name: "paper-plane",
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
                        width: "100%",
                        marginVertical: 10,

                      }}
                      titleStyle={{
                        fontSize: 18,
                        fontWeight: 600
                      }}
                  />  

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10
        
    }
})