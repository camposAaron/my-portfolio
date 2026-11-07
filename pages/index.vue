<template>
    <main id="main">
        <Hero>
            <template #cube>
                <Cube />
            </template>
        </Hero>
        <!-- Offer first, then the work that backs it, then who is behind it. -->
        <Services />
        <Projects />
        <About />
        <Skills />
        <Contact />
    </main>
</template>
