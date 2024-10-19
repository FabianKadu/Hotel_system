const Brand = ({ ...props }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Reemplaza el SVG por una imagen PNG */}
        <img
            src="/favicon.ico" 
            alt="Hotel Logo"
            width="60"
            height="60"
            {...props}
        />
        {/* Nombre del hotel al lado de la imagen */}
        <span style={{ marginLeft: '10px', fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
            Hotel Cat
        </span>
    </div>
);

export default Brand;
