import { HelpCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export const StitchDesign = (): JSX.Element => {
  const loginOptions = [
    { text: "Continue with SearchEngineCo" },
    { text: "Continue with Email" },
    { text: "Continue with Social" },
  ];

  return (
    <div className="flex flex-col items-start relative bg-white">
      <div className="flex flex-col min-h-[844px] items-start justify-between relative self-stretch w-full flex-[0_0_auto] bg-[#111614]">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <header className="flex items-center justify-between pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto] bg-[#111614]">
            <div className="flex flex-col items-center pl-12 pr-0 py-0 relative flex-1 grow">
              <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Lexend',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-[23px]">
                Welcome
              </h1>
            </div>

            <HelpCircleIcon className="relative w-12 h-12 text-white" />
          </header>

          <section className="flex flex-col items-center pt-5 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Lexend',Helvetica] font-bold text-white text-[28px] text-center tracking-[0] leading-[35px]">
              Stay Informed, Stay Aware
            </h2>
          </section>

          <section className="flex flex-col items-center pt-1 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Lexend',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-6">
              Access news with clarity and insights. Choose your login method to
              begin.
            </p>
          </section>

          <section className="flex items-start justify-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex-col max-w-[480px] items-start gap-3 px-4 py-3 flex-1 grow flex relative">
              {loginOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="flex min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 relative w-full bg-[#283833] rounded-xl overflow-hidden hover:bg-[#3a5449] border-0"
                >
                  <span className="[font-family:'Lexend',Helvetica] font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    {option.text}
                  </span>
                </Button>
              ))}
            </div>
          </section>

          <section className="flex flex-col items-center pt-1 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Lexend',Helvetica] font-normal text-[#9bbaaf] text-sm text-center tracking-[0] leading-[21px]">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </section>

          <div className="flex flex-col w-[390px] h-[844px] items-start justify-end absolute top-0 left-0 bg-[#14141466]">
            <div className="flex-col items-start self-stretch w-full flex-[0_0_auto] bg-[#111614] flex relative">
              <div className="flex h-5 items-center justify-center relative self-stretch w-full">
                <div className="relative w-9 h-1 bg-[#3a5449] rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <footer className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
            <Button className="min-w-[84px] max-w-[480px] h-12 items-center justify-center px-5 py-0 flex-1 grow bg-[#0cf29e] rounded-xl overflow-hidden flex relative hover:bg-[#0cf29e]/90 border-0">
              <span className="[font-family:'Lexend',Helvetica] font-bold text-[#111614] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                Continue
              </span>
            </Button>
          </div>

          <div className="relative self-stretch w-full h-5 bg-[#111614]" />
        </footer>
      </div>
    </div>
  );
};
