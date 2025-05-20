import LogoutButton from "../pages/Logout";
import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="p-8 bg-darkBg text-textPrimary w-full min-h-screen[vh50]">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <Card
          title="AI Interview Simulator"
          description="Practice mock interviews powered by AI to boost your confidence."
          buttonText="Take Your Interview"
          bgColor="bg-cardBg"
        />
        <Card
          title="Coding Problems"
          description="Sharpen your skills with curated DSA questions."
          buttonText="Practice Coding"
          bgColor="bg-purple-900"
        />
        <Card
          title="Mock Tests"
          description="Timed, real-world coding assessments to test your readiness."
          buttonText="Start Mock Test"
          bgColor="bg-purple-800"
        />
      </div>
      <LogoutButton/>
    </div>
    
  );
};

export default Dashboard;
  