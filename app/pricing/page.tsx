
import PricingLeaner from "app/payment/page";
import Image from "next/image";

export const metadata = {
    title: "Student-Friendly Prices – Loka Technology",
};

export default function PricingPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            {/* Hero strip */}
            <section className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border">
                <Image
                    src="/images/loka4.png"
                    alt="Student tapping phone on locker"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <h1 className="absolute bottom-4 left-4 text-white text-3xl font-bold">
                    Student-Friendly Prices
                </h1>
            </section>

            {/* Re-use your existing component */}
            <PricingLeaner />
        </main>
    );
}