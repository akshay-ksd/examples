import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import _ from 'lodash';

const searchAPI = async (query) => {
  try {
    // Your API call logic here with the search query
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const debouncedSearchAPI = _.debounce(searchAPI, 500); // Adjust the delay (500ms) as needed

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      const results = await debouncedSearchAPI(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default SearchScreen;
