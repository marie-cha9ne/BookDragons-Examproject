# BookDragons
**BookDragons** er en webapplikasjon bygget med **Next.js** og **TypeScript**, som er bygget opp av to deler en backend og en frontend. Prosjektet bruker **SQLite** som database. 
I backend kan ansatte for **BookDragons** legge til innhold på siden tilgjengelig for kunden og motta ordre/reservasjoner av bøker i admin-panelet. I **Books** kan ansatte legge til nye bøker i sortimentet deres slik at kundene kan kjøpe/reservere bøkene i nettbutikken. I **Authors** kan de ansatte legge inn forfattere og knytte bøker opp mot de for å ha oversikt over hvilke bøker de har per forfatter samt legge til en kort presentasjon om forfatteren. I **Genres** kan ansatte legge til sjangre og knytte de opp mot bøkene, og legge til en beskrivelse av sjangerne som legges inn. I **Page Photos** Kan ansatte legge inn bilder av bokomslag, og redigere størrelsen på de slik at bildene kan passe flere steder. I **Orders** vil ansatte kunne se hvilke bestillinger som har kommet inn fra kundene.
I frontend kan kunden se hvilke bøker som er til salgs på siden, legge til bøker de ønsker å handle i handlekurven, fra handlekurven bli navigert videre til utsjekks siden den de kan sende inn bestillingen sin. Kunden kan også navigere videre fra hjemsiden til **Genres**-siden og **Authors**-siden for å se forskjellige sjangre og forfattere og hvilke bøker som er tilgjengelig for de. Appen lagrer handlekurven lokalt med **Zustand og localStorage**. 

## Hvordan starte prosjektet
Følg stegene under for å kjøre prosjektet lokalt
skriv i terminalen:
### 1.Klon prosjektet
```bash
git clone https://github.com/marie-cha9ne/Webtek-eksamen-H2025
cd Webtek-eksamen-H2025
```
### 2.Installer avhengigheter
```bash
npm install
```
### 3.Åpne prosjektet lokalt 
```bash
npm run dev
```
hold inn alt(windows)/option(mac) og klikk på:
- Local: http://localhost:3000 

for å åpne (frontend). For å se admin-panelet legg på /admin i URL'en: 
http://localhost:3000/admin 

Logg inn med bruker opprettet i Payload.

## Mappestruktur og filforklaring
```bash
src/
| app/
   |(frontend)/
      |authors/
      |  |[authorId]/page.tsx #Individuell forfatter visning
      |  |page.tsx  #Viser alle forfattere
      |checkout/page.tsx #Bestillings skjema + Oppsummering
      |genre/
      |  |[slug]/page.tsx #Individuell sjanger & bøker til de
      |  |page.tsx #Visning av alle sjangre 
      |page.tsx #HomePage, visning av alle bøker
      |api/custom-orders/route.ts #Route handler 
|collections/
  |Authors.ts #Forfattere + kort presentasjon + relasjon til bøker
  |Books.ts #Bok sortiment (tittel, bokomslag, alders anbefalning, tilgjengelighet, forfatter, sjanger, pris)
  |Genre.ts #Sjangre + beskrivelse + relaterte bøker
  |Orders.ts #Bestillinger fra checkout skjemaet
  |PagePhotos.ts #Bilde opplastning med ulike størrelser/formats
|components/
    |AddToCart/AddToCart.tsx #Knapp komponent for å legge bok i handlekurv
    |BookCards/BookCards.tsx #Visning av bøkene lagt til fra admin
    |BookList/BookList.tsx #Filtrerer bok-kort ifh søk i søkefelt
    |CartSlide/CartSlide.tsx #UI for visning og åpne og lukke handlekurv
    |CustomerForm/CustomerForm.tsx #Skjema til ustjekk siden
    |Footer/Footer.tsx #Sidens footer
    |MobileMenu/MobileMenu.tsx #Navigerings meny tilpasset mindre skjermstrl
    |Nav/Nav.tsx #Sidens nav-bar
    |Searchbar/Searchbar.tsx #Søkefelt funksjonalitet
    |ShoppingCart/ShoppingCart.tsx #Handlekurv innhold
|store/cartStore.ts #Zustand (global state)
|utils/toast.ts #Gjenbrukbar toast funksjon
|bookDragons.db #SQLite-database
```
## Komponentstruktur

 **AddToCart**
 klientkomponent som håndterer knappens funksjonalitet til å legge en bok i handlekurven. Den bruker (Zustand + localStorage) for å lagre varene, viser en toast melding ved 'added' eller 'soldout',og kan trigge en onAdd-callback hvis parent-komponentet trenger å utføre mer logikk etter et vellykket klikk.

 **BookCards**
 En presentasjonskomponent som viser et enkelt bokkort med bilde, tittel, forfatter, sjanger, tilgjengelighet og pris. Den håndterer enkel datavalidering (f.eks manglende forfatter eller cover) og lenker videre til dynamiske sider for forfatter og sjanger. Komponentens AddToCart-knapp bruker en callback for å vise en lokal toast-melding.

 **BookList**
 Et komponent som viser frem bøker i forhold til søk i  søkefelt. Søkefunksjonen filtrerer bøkene i sanntid basert på tittel og sender de filtrerte resultatene videre til BookCards for visning. Komponentet bruker lokal state for søket og håndterer tomme søkeresultater.

 **CartSlide**
 Et komponent som viser handlekurven i et sidepanel. Den mottar open for å styre visning/animasjon og onClose for å lukke panelet. Den inneholder også ShoppingCart komponentet og fungerer som en visuell container.

 **CustomerForm**
 Komponentet håndterer utsjekk-prosessen. Den samler inn kundenavn, kundens epost, oppsummerer handlekurven, konverterer cart-data til riktig format for Payload, den sender også bestillingen til backend via ```/api/custom-orders```. Komponentet viser tilbakemeldinger gjennom lokal toast, en bekreftelses dialog, og tømmer handlekurven ved vellykket innsending.

 **api/custom-orders/route.ts**
 Dette er route handeleren som mottar data fra Customer form og oppretter en ny bestilling i Payload. Den validerer felt (navn, kontaktinfo, items), sjekker at alle items har riktig struktur. Lagrer bestillingen i Orders innholdssamlingen i payload med ```payload.create()``` og returnerer bestillingen som en JSON

 **Footer**
 Viser footer på siden.

 **MobileMenu**
 Slide-in meny for mobilvisning.

 **Nav**
 Navigasjonsbaren til siden

 **Searchbar**
 Et kontrollert søkekomponent som håndterer brukerens input og sender search-term tilbake til parent-komponentet via onSearch.

 **ShoppingCart**
 Komponentet viser innholdet i handlekurven og lar brukeren øke eller redusere antall eksemplarer av en bok. Den henter og oppdaterer cart-data via Zustand, regner ut totalpris, grupperer duplikater og unike varer med antall og en knapp som sender brukeren videre til utsjekk-siden. Komponentet brukes inne i CartSlide.

 ## Verktøy brukt
 - **Next.js**
 - **React**
 - **Payload CMS**
 - **SQLite**
 - **TypeScript**
 - **Zustand + localStorage**
 - **Sharp**
 - **CSS Modules**

## Funksjonalitet
- Kunden kan legge bøker som er vist frem på siden inn i handlekurven, navigere seg til Authors og Genre via navigasjons meny. Kunden kan også navigere seg til spesifikke forfattere og sjangre ved klikk av link som ligger inni bok-visningen. Kunden får en oversikt over hvor mange eksemplarer som er tilgjengelig hos bedriften, og sett alders anbefaling på boken. På forsiden kan også brukeren søke etter spesifikke bøker i søkefeltet for å se om boken de ønsker finnes tilgjengelig hos bedriften. I handlekurven får kunden en oversikt over bestillingen sin, og pris på hver enkelt bok samt en total sum. Videre fra handlekurven blir kunden navigert til utsjekk.

- Ansatte kan legge til en ny bok via Books innholdssamlingen i adminpanelet der kan de legge til tittel, bokomslag, alders anbefaling, tilgjengelighet, forfatter til boken, sjanger til boken, pris på boken(tilleggs funksjonalitet).Når ansatte lagrer boken blir den automatisk lagt til på siden slik at kundene kan handle den. NB! Før boken lages må ansatte legge inn forfatter og sjanger om dette ikke allerede er gjort, siden feltene i Books er required må forfatteren og sjangeren allerede finnes. 

**Checkout**
- Kunden blir navigert til utsjekksiden via handlekurven. På utsjekk siden viser et skjema der kunden blir nødt til å fylle inn navn og email. I skjemaet får kunden også se en oppsummering av bestillingen. Ved klikk av reserver ordre får kunden en melding dersom innsendingen av skjemaet ble godkjent, klikker brukeren vekk meldingen blir kunden navigert tilbake til hjemsiden.

- Ansatte får en oversikt over bestillingene fra kundene. Bestillingene blir vist i Orders innholds samlingen der ansatte får en oversikt over kundens navn, kundens mail for å kunne oppdatere kunden om pickup av bestillingen, og hvilke bøker og hvor mange eksemplarer av samme bok kunden ønsker å reservere. 

**authors**
- Kunden kan navigere seg til authors siden via navigasjons menyen. Landings siden på authors er alle forfatterne som finnes tilgjengelig hos bedriften er vist frem, med en kort beskrivelse av forfatteren. Ved klikk av knappen i boksen til en spesifikk forfatter blir kunden navigert til forfatterens side der kan kunden finne alle bøkene som er skrevet av den spesifikke forfatteren.

- Ansatte kan legge inn forfattere via innholdssamlingen Authors. Der kan ansatte føre inn url-sti til forfatteren, navnet på forfatteren, kort presentasjon, og koble opp hvilke bøker som forfatteren har skrevet.

**genre**
- Kunden kan navigere seg til spesifikke sjangre via link som vises i bok-kort på forsiden. Kunden vil da få en oversikt over alle bøkene som hører til sjangeren og en beskrivelse av hva sjangeren går ut på.

- Ansatte kan legge til sjangere i innholdssamlingen Genre. Der kan de ansatte legge inn url-sti til spesifikk sjanger, navnet på sjangeren, beskrivelse av sjangeren og koble opp bøker mot sjangeren som passer.

## Side note
Da jeg først startet med dette prosjektet og lagde innholdssamlingene hadde jeg alle feltene i innholdssamlingene Books, Genre og Author Satt som ```required: true```, men da jeg først skulle lage en bok i innholdssamlingen ble det en evig loop om å legge til forfatter, men forfatter fantes ikke enda, og forfatter måtte ha en bok å legge til i feltet, men jeg kunne ikke lage en bok uten en forfatter. Det samme gjalt innholdssamlingen Genre. Jeg tok dermed en ganske enkel løsning på det og fjernet ```required: true``` i  Genre og Author sine Book in genre og Books written. Dette fører da til at ansatte blir nødt til å manuelt legge til bøkene inni Genre og Authors selv etter å ha lagt til forfatter og sjanger i Books innholdssamlingen. Grunnet lite tid til grundigere arbeid, kom jeg dersverre ikke med en annen løsning for dette som kunne vært 'enklere'
