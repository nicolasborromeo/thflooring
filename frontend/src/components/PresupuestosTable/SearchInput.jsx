export default function SearchInput({ searchInput, setSearchInput }) {
    return (
        <div>
            <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
}
