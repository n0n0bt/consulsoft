<script setup lang="ts">
useScrollReveal()
useHead({ title: 'Datenschutzerklärung' })
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      lede="Informationen zum Umgang mit Ihren personenbezogenen Daten"
    />

    <!-- Content -->
    <section class="shell py-20 sm:py-24">
      <div class="legal reveal">
        <!-- 1. Verantwortliche Stelle -->
        <div>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>
            Consulsoft UG (haftungsbeschränkt)<br />
            Nailaer Str. 39<br />
            95119 Naila<br />
            E-Mail: info@consulsoft.de
          </p>
          <p>
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
            über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>
        </div>

        <!-- 2. Erhebung und Speicherung -->
        <div>
          <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>
            Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese
            Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
            Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
          </p>
          <p>
            Sie werden insbesondere zu folgenden Zwecken verarbeitet:
          </p>
          <ul>
            <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
            <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
            <li>Auswertung der Systemsicherheit und -stabilität</li>
            <li>Zu weiteren administrativen Zwecken</li>
          </ul>
          <p>
            Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes
            Interesse folgt aus den oben aufgelisteten Zwecken zur Datenerhebung.
          </p>
        </div>

        <!-- 3. Kontaktformular -->
        <div>
          <h2>3. Kontaktformular</h2>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
            und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf
            Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit
            widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          </p>
        </div>

        <!-- 4. Cookies -->
        <div>
          <h2>4. Cookies</h2>
          <p>
            Unsere Website verwendet keine externen Cookies und keine Tracking- oder Analyse-Cookies. Es werden
            keine Cookies von Drittanbietern gesetzt. Wir verzichten bewusst auf den Einsatz von Tools wie
            Google Analytics oder vergleichbaren Diensten.
          </p>
          <p>
            Soweit technisch notwendige Cookies verwendet werden, dienen diese ausschließlich der Funktionalität
            der Website und werden nach Ende Ihrer Browser-Sitzung automatisch gelöscht.
          </p>
        </div>

        <!-- 5. Hosting -->
        <div>
          <h2>5. Hosting</h2>
          <p>
            Diese Website wird bei Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA gehostet.
            Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern von Netlify
            gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
            Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert
            werden, handeln.
          </p>
          <p>
            Der Einsatz von Netlify erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung
            unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Netlify
            verarbeitet Daten auch in den USA. Wir weisen darauf hin, dass nach Meinung des EuGH derzeit kein
            angemessenes Schutzniveau für den Datentransfer in die USA besteht. Weitere Informationen finden Sie in
            der Datenschutzerklärung von Netlify: https://www.netlify.com/privacy/
          </p>
        </div>

        <!-- 6. Betroffenenrechte -->
        <div>
          <h2>6. Betroffenenrechte</h2>
          <p>
            Sie haben folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten durch uns zu beschweren.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
