import app from './src/app/app';
import { connectToDB, sequelize } from './src/config/db';

const PORT = 4000;

const startServer = async () => {
    try {
        await connectToDB();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error('Unable to start server:', error);
    }
};

startServer();
