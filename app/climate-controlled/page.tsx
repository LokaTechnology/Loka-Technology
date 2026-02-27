
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Climate-Controlled Lockers – Loka Technology',
};

export default function ClimateControlledPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            <h1 className="text-3xl font-bold">Climate-Controlled Storage</h1>

            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Why climate control matters</h2>
                    <p className="text-neutral-700">
                        Arizona heat can warp plastics, fry batteries and melt adhesives.
                        Our lockers hold a steady 68-72 °F (20-22 °C) and &lt;50 % humidity,
                        so your laptop, lab kit, medication and snacks survive the semester.
                    </p>
                    <ul className="list-disc list-inside text-neutral-700 space-y-1">
                        <li>Temperature sensor every bay</li>
                        <li>Redundant HVAC with filter alerts</li>
                        <li>Insulated steel panels, low-E glass</li>
                        <li>Integrated with the same core service model as standard lockers</li>
                    </ul>
                </div>

                <figure className="relative w-full aspect-video rounded-xl overflow-hidden border">
                    <Image
                        src="/images/loka5.png"
                        alt="Inside of a climate-controlled locker bay"
                        fill
                        className="object-cover"
                    />
                </figure>
            </section>

            <section>
                <Link
                    href="/book"
                    className="btn btn-primary"
                >
                    Reserve a climate-controlled locker
                </Link>
            </section>
        </main>
    );
}