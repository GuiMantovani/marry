export function Card({ children, color }) {
    return (
        <div className={`${color} p-4 rounded-lg shadow-md`}>
            {children}
        </div>
    );
}