import { View, Text, StyleSheet, FlatList} from "react-native"
import { getOrderDetailById } from '../../../services/api';
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import FoodCardInReview from "../../../components/Order/FoodCardInReview";
import { Button } from "@rneui/themed";

export default function ReviewScreen({route}){
    const {order_id} = route.params;
    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [ratings, setRatings] = useState({})

    

    useEffect(() => {
        const loadData = async () => {
            const response = await getOrderDetailById(order_id);
            console.log("Review: " + response.list)
            if (response){
                setFood(response.list)

                // Khởi tạo ratings với giá trị mặc định là 5 sao
                const initialRatings = response.list.reduce((acc, item) => {
                    acc[item.food.id] = 5; // Mặc định 5 sao
                    return acc;
                }, {});
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