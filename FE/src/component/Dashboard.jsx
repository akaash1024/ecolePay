import { BySchoolTransactions } from "./dashboard/BySchoolTransactions";
import { FeeStatus } from "./dashboard/FeeStatus";
import { OverView } from "./dashboard/Overview";

export const Dashboard = () => {
  return (
    <>
      <main>
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-10 h-full">
            <OverView />
          </div>
        </div>
      </main>
    </>
  );
};
