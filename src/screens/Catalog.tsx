import { Text, View } from "react-native"
import { Product } from "../navigations/TopTabNavigator"

export default function Category({ category }: { category: Product[] }) {
    return (
        <View>
            <Text>{category.title}</Text>
        </View>
    )
}