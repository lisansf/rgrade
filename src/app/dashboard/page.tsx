import { Metadata } from 'next';
import CDashboard from './Components/CDashboard';

export const metadata: Metadata = {
    title: "Dashboard | Retro Grade"
}

export default function Dashboard() {
    return <CDashboard />
}