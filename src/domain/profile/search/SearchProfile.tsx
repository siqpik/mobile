import React, {useState} from 'react'
import {View} from "react-native"
import {SearchBar} from 'react-native-elements'
import ProfileResult from "../../model/ProfileResult"
import {getJson} from '../../service/ApiService'
import {useNavigation} from "@react-navigation/native"
import SearchResults from "./SearchResults"

export default () => {

    const navigation = useNavigation()

    const [search, setSearch] = useState('')
    const [profiles, setProfiles] = useState([])

    const updateSearch = (search: string) => {
        if (search === '') {
            setProfiles([])
        } else {
            searchProfiles(search)
        }

        setSearch(search)
    }

    const searchProfiles = (name: string) => {
        getJson('/user/' + name)
            .then(profiles => profiles.map(profile => new ProfileResult(profile)))
            .then(profiles => setProfiles(profiles))
            .catch(error => console.log(error))
    }

    return (
        <View>
            <SearchBar
                round
                searchIcon={{size: 24}}
                onChangeText={text => updateSearch(text)}
                onClear={() => updateSearch('')}
                placeholder="Type Here..."
                value={search}
            />
            {
                profiles.map((profile, index) => (
                    <SearchResults
                        index={index}
                        navigation={navigation}
                        userName={profile.userName}
                        avatarUrl={profile.avatarUrl}
                        name={profile.name}
                    />
                ))
            }
        </View>
    )
}