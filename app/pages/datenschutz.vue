<script setup lang="ts">
useScrollReveal()
useHead({ title: 'Datenschutzerklärung' })
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-surface-50" />
      <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold-200/20 rounded-full blur-[120px]" />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-6">
            <span class="w-8 h-px bg-gold-600" />
            RECHTLICHES
          </span>
          <h1 class="fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-900 tracking-tight leading-[1.1] mb-6" style="transition-delay: 0.1s">
            Datenschutzerklärung
          </h1>
          <p class="fade-up text-lg text-dark-400 leading-relaxed font-light max-w-lg" style="transition-delay: 0.2s">
            Informationen zum Umgang mit Ihren personenbezogenen Daten
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <!-- 1. Verantwortliche Stelle -->
        <div class="fade-up mb-12">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">1. Verantwortliche Stelle</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Consulsoft UG (haftungsbeschränkt)<br />
            Nailaer Str. 39<br />
            95119 Naila<br />
            E-Mail: info@consulsoft.de
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
            über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>
        </div>

        <!-- 2. Erhebung und Speicherung -->
        <div class="fade-up mb-12" style="transition-delay: 0.05s">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese
            Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
            Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Sie werden insbesondere zu folgenden Zwecken verarbeitet:
          </p>
          <ul class="list-disc list-inside text-dark-400 leading-relaxed font-light mt-4 space-y-2">
            <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
            <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
            <li>Auswertung der Systemsicherheit und -stabilität</li>
            <li>Zu weiteren administrativen Zwecken</li>
          </ul>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes
            Interesse folgt aus den oben aufgelisteten Zwecken zur Datenerhebung.
          </p>
        </div>

        <!-- 3. Kontaktformular -->
        <div class="fade-up mb-12" style="transition-delay: 0.1s">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">3. Kontaktformular</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
            und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf
            Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit
            widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          </p>
        </div>

        <!-- 4. Cookies -->
        <div class="fade-up mb-12" style="transition-delay: 0.15s">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">4. Cookies</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Unsere Website verwendet keine externen Cookies und keine Tracking- oder Analyse-Cookies. Es werden
            keine Cookies von Drittanbietern gesetzt. Wir verzichten bewusst auf den Einsatz von Tools wie
            Google Analytics oder vergleichbaren Diensten.
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Soweit technisch notwendige Cookies verwendet werden, dienen diese ausschließlich der Funktionalität
            der Website und werden nach Ende Ihrer Browser-Sitzung automatisch gelöscht.
          </p>
        </div>

        <!-- 5. Hosting -->
        <div class="fade-up mb-12" style="transition-delay: 0.2s">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">5. Hosting</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Diese Website wird bei Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA gehostet.
            Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern von Netlify
            gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
            Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert
            werden, handeln.
          </p>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Der Einsatz von Netlify erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung
            unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Netlify
            verarbeitet Daten auch in den USA. Wir weisen darauf hin, dass nach Meinung des EuGH derzeit kein
            angemessenes Schutzniveau für den Datentransfer in die USA besteht. Weitere Informationen finden Sie in
            der Datenschutzerklärung von Netlify: https://www.netlify.com/privacy/
          </p>
        </div>

        <!-- 6. Betroffenenrechte -->
        <div class="fade-up mb-0" style="transition-delay: 0.25s">
          <h2 class="text-2xl font-bold text-dark-900 mb-4">6. Betroffenenrechte</h2>
          <p class="text-dark-400 leading-relaxed font-light">
            Sie haben folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>
          <ul class="list-disc list-inside text-dark-400 leading-relaxed font-light mt-4 space-y-2">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p class="text-dark-400 leading-relaxed font-light mt-4">
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten durch uns zu beschweren.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
