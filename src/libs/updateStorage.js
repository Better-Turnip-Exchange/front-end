export const saveState = (state) => {
    try {
        localStorage.setItem('villager_state', JSON.stringify(state))
    } catch (err) {
        console.log(err)
    }
}

export const loadState = () => {
    try {
        const fetchedState = localStorage.getItem('villager_state')
        if (fetchedState === null) { return undefined }
        return JSON.parse(fetchedState)
    } catch (err) {
        return undefined
    }
}

