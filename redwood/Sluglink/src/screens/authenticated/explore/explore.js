import React, {
    useEffect,
    useState
} from 'react';

import {
    Text,
    StyleSheet,
    FlatList,
    View
} from 'react-native';
import {
    Button,
    Chip
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExplorePosts } from '../../../hooks';
import remoteConfig from '@react-native-firebase/remote-config';

import Animated, {
    FadeInLeft
} from 'react-native-reanimated';

import { PostsFlatList } from '../components';
import { Colors, Fonts, width, height } from '../../../styles';

const FilterChip = ({ index, title, onPress, selected }) => {
    return (
        <Animated.View
            style={{ flexShrink: 1}}
            entering={FadeInLeft.delay(index * 50)}
        >
            <Chip
                titleStyle={Fonts.Paragraph3}
                onPress={onPress}
                containerStyle={{ margin: 5 }}
                title={title}
                type={selected ? 'solid': 'outline'}
            />
        </Animated.View>

    )
};

export const ExploreScreen = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [posts, isFetching, refresh, fetchMore] = useExplorePosts(selectedCategory);

    useEffect(() => {
        const json = remoteConfig().getValue('categories').asString();
        setCategories(JSON.parse(json));
    }, []);

    const renderCategory = ({ item, index }) => (
        <FilterChip
            index={index+1}
            title={item.name}
            selected={selectedCategory === item.name}
            onPress={() => setSelectedCategory(item.name)}
        />
    );
    
    const keyExtractor = (item) => item.name;
    
    const Header = (
        <FilterChip
            index={0}
            title='All Categories'
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
        />
    )

    return (
        <SafeAreaView
            edges={['left', 'right']}
            style={styles.container}
        >
            <View style={{
                width: '100%',
                height: height / 15,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                <FlatList
                    data={categories}
                    ListHeaderComponent={Header}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCategory}
                    keyExtractor={keyExtractor}
                    horizontal={true}
                />
            </View>
            <PostsFlatList
                posts={posts}
                refresh={refresh}
                isFetching={isFetching}
                fetchMore={fetchMore}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White.rgb,
        flex: 1,
    },
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    seeMore: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb
    }
});