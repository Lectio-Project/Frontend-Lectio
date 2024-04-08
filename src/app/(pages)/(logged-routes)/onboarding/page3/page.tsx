'use client';

import { useState } from 'react';

import AuthorOnboarding from '@/app/components/AuthorOnboarding/AuthorOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';

import '@/app/styles/OnboardingSteps.css';
import { AuthorProps } from '@/types/author';

export default function Page3() {
    const [selectedAuthors, setSelectedAuthors] = useState<AuthorProps[]>([]);

    return (
        <main className="onboarding-steps-container">
            <HeaderOnboarding title="autores" step={2} />

            <section className="onboarding-steps-options">
                <AuthorOnboarding
                    selectedAuthors={selectedAuthors}
                    setSelectedAuthors={setSelectedAuthors}
                />
            </section>

            <FooterOnboarding
                selectedItems={selectedAuthors}
                page="./page4"
                title="autores"
            />
        </main>
    );
}
