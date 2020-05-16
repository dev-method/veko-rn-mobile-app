
export default {
    async fetchListData(apiUrl: string) {
        try {
            let response = await fetch(apiUrl);
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}