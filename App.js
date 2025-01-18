import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View,StyleSheet} from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  //EXERCISE 1A
  useEffect(()=> {
    fetch("https://mysafeinfo.com/api/data?list=usamericanidol&format=json&case=default")
        .then((response)=>{
          return response.json();
        })
        .then((myJson)=>{
          if(originalData.length<1){
            setMyData(myJson);
            originalData = myJson;
          }

        })
  }, []);

  const FilterData = (text) => {
    if(text != ''){
      let myFilteredData = originalData.filter((item) =>
          item.Season.toString().includes(text),



      );
      setMyData(myFilteredData);
    }
    else{
      setMyData(originalData);
    }
  }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.Season}>Season {item.Season}</Text>
                <View style={styles.line} />
                <Text style={styles.WinnerName}>{item.WinnerName}</Text>
                <Text style={styles.Age}>Age:{item.Age}</Text>
                <Text style={styles.Hometown}>{item.Hometown}</Text>
            </View>
        );
    };


    return (
      <View>
        <StatusBar/>
        <Text style={styles.Title}>American Idol Winners</Text>
        <Text style={styles.SearchText}>Search:</Text>
        <TextInput style={styles.Search} onChangeText={(text)=> {FilterData(text)}}/>
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}
const styles = StyleSheet.create({
    card: {
        borderWidth: 3,
        borderColor: 'darkblue',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 16,
        backgroundColor: 'lightblue',

    },
    Season: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'darkblue',
        marginBottom: 4,
        textAlign: 'center'

    },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: 'darkblue',
        marginVertical: 8,
        width: '100%',
        alignSelf: 'center',
    },
    WinnerName: {
        fontSize: 18,
        color: 'blue',
        marginBottom: 2,
        fontWeight: 'bold',
    },
    Age: {
        fontSize: 14,
        color: 'black',
    },
    Hometown: {
        fontSize: 14,
        color: 'black',
    },
    Search:{
        borderWidth: 1,
        backgroundColor: 'lightblue',
    },
    SearchText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkblue',
    },
    Title:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'lightblue',
        backgroundColor: 'darkblue',
        borderWidth: 1,
        borderColor: 'lightblue',
    }
});

export default App;
