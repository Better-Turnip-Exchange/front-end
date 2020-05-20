export const saveState = (state) => {
    try {
        localStorage.setItem('villager_state', JSON.stringify(state))
        console.log('State saved!')
    } catch (err) {
        console.log(err)
    }
}

export const loadState = () => {
    try {
        const fetchedState = localStorage.getItem('villager_state')
        if (fetchedState === null) { return undefined }
        console.log(JSON.parse(fetchedState))
        return JSON.parse(fetchedState)
    } catch (err) {
        return undefined
    }
}

