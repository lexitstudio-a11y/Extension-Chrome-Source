/*
 * Base de données « Qui possède quoi ».
 *
 * Données indicatives, compilées à partir de sources publiques (rapports
 * annuels, presse, Wikipédia, observatoires des médias). La propriété des
 * médias évolue vite : chaque groupe porte une date `asOf` et un niveau de
 * `confidence` ("etabli" ou "a-verifier"). Les rubriques « social » décrivent
 * des positionnements éditoriaux ou idéologiques tels que documentés ou
 * débattus publiquement ; elles ne constituent pas un jugement de l'extension.
 *
 * type : prive | public | independant | fondation | etat-etranger
 */
const MOM_DATA = {
  version: "2025-06",
  groups: [
    // ───────────────────────── France : privé ─────────────────────────
    {
      id: "bollore",
      name: "Groupe Bolloré",
      type: "prive",
      owner: "Vincent Bolloré et sa famille (Compagnie de l'Odet / Bolloré SE), actionnaire de référence de Vivendi / Canal+",
      country: "FR",
      summary: "Conglomérat familial présent dans la logistique, l'énergie, la publicité et les industries culturelles, qui contrôle un pôle médias important.",
      economic: [
        "Publicité et communication (Havas)",
        "Audiovisuel et cinéma (Canal+, CNews, CStar)",
        "Édition (Hachette Livre, Editis) et magazines (Paris Match, Prisma Media)",
        "Logistique et énergie (Bolloré Energies ; activités logistiques et portuaires africaines cédées en 2022-2024)",
        "Participations dans la musique (Universal Music Group)"
      ],
      social: [
        "Ligne éditoriale de CNews, Europe 1 et du JDD décrite par de nombreux observateurs, journalistes et régulateurs comme conservatrice / de droite ; le groupe conteste le caractère partisan",
        "Conflits sociaux et départs de rédactions (iTélé 2016, JDD 2023) liés à des désaccords sur l'indépendance éditoriale",
        "Interventions de l'Arcom sur le pluralisme (CNews, C8)"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Groupe Bolloré", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+Bolloré" },
        { label: "Wikipédia – Canal+ Group", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+Canal%2B" }
      ]
    },
    {
      id: "bouygues",
      name: "Bouygues (Groupe TF1)",
      type: "prive",
      owner: "Bouygues SA (famille Bouygues, salariés, investisseurs) – actionnaire de contrôle de TF1",
      country: "FR",
      summary: "Groupe de BTP, d'énergie et de télécoms qui détient le premier groupe de télévision privé français.",
      economic: [
        "BTP et infrastructures (Bouygues Construction, Colas) – dépendants de la commande publique",
        "Télécoms (Bouygues Telecom)",
        "Services énergétiques (Equans)",
        "Télévision commerciale financée par la publicité (TF1, TMC, TFX, LCI)"
      ],
      social: [
        "Télévision généraliste grand public ; l'indépendance vis-à-vis d'un actionnaire dépendant de contrats publics est régulièrement débattue",
        "Dépendance aux recettes publicitaires et aux audiences"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Bouygues", url: "https://fr.wikipedia.org/w/index.php?search=Bouygues" },
        { label: "Wikipédia – Groupe TF1", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+TF1" }
      ]
    },
    {
      id: "lvmh-arnault",
      name: "LVMH / Famille Arnault",
      type: "prive",
      owner: "Bernard Arnault et sa famille (via Groupe Arnault)",
      country: "FR",
      summary: "Premier groupe mondial du luxe, propriétaire à titre personnel de plusieurs titres de presse économique et généraliste.",
      economic: [
        "Luxe : mode, maroquinerie, vins & spiritueux, parfums, joaillerie (Louis Vuitton, Dior, Moët Hennessy, Sephora…)",
        "Grand annonceur publicitaire dans la presse",
        "Presse : Les Échos, Le Parisien – Aujourd'hui en France, Radio Classique"
      ],
      social: [
        "Question régulière du conflit d'intérêts entre un grand annonceur du luxe et des titres d'information (enquêtes de presse sur les relations avec journalistes)",
        "Ligne économique libérale pour Les Échos ; presse populaire grand public pour Le Parisien"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – LVMH", url: "https://fr.wikipedia.org/w/index.php?search=LVMH" },
        { label: "Wikipédia – Groupe Les Échos-Le Parisien", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+Les+Échos-Le+Parisien" }
      ]
    },
    {
      id: "dassault",
      name: "Groupe Dassault (Groupe Figaro)",
      type: "prive",
      owner: "Famille Dassault (Groupe industriel Marcel Dassault)",
      country: "FR",
      summary: "Groupe industriel de défense et d'aéronautique, propriétaire du quotidien Le Figaro et de ses déclinaisons.",
      economic: [
        "Aéronautique et défense (Dassault Aviation : Rafale, Falcon) – grandes commandes d'État et exportations soutenues politiquement",
        "Logiciels (Dassault Systèmes, groupe distinct)",
        "Presse et petites annonces (Le Figaro, Madame Figaro, Le Particulier, CCM Benchmark)"
      ],
      social: [
        "Ligne éditoriale du Figaro généralement classée centre-droit / droite libérale-conservatrice",
        "Débat sur l'indépendance de la couverture des questions de défense, l'actionnaire étant fournisseur de l'État"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Groupe Dassault", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+Dassault" },
        { label: "Wikipédia – Le Figaro", url: "https://fr.wikipedia.org/w/index.php?search=Le+Figaro" }
      ]
    },
    {
      id: "le-monde",
      name: "Groupe Le Monde",
      type: "prive",
      owner: "Le Monde Libre (Xavier Niel, Daniel Křetínský, entre autres) ; le Pôle d'indépendance (Société des rédacteurs, Fonds pour l'indépendance de la presse) détient un droit de veto sur la direction",
      country: "FR",
      summary: "Groupe de presse dont le capital est détenu par des entrepreneurs, avec un mécanisme statutaire de protection de l'indépendance de la rédaction.",
      economic: [
        "Presse : Le Monde, L'Obs, Télérama, Courrier international, La Vie, Huffington Post France",
        "Actionnaires actifs dans les télécoms (Iliad/Free) et l'énergie / la distribution (EPH, Casino, Fnac-Darty)",
        "Modèle d'abonnements numériques"
      ],
      social: [
        "Ligne éditoriale du Monde souvent décrite comme centre-gauche / libérale ; Télérama et L'Obs plutôt centre-gauche",
        "Droit de veto des journalistes sur la nomination de la direction"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Groupe Le Monde", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+Le+Monde" },
        { label: "Wikipédia – Xavier Niel", url: "https://fr.wikipedia.org/w/index.php?search=Xavier+Niel" }
      ]
    },
    {
      id: "kretinsky",
      name: "Daniel Křetínský (Czech Media Invest / EPH)",
      type: "prive",
      owner: "Daniel Křetínský (EPH, Czech Media Invest, CMI France)",
      country: "CZ/FR",
      summary: "Homme d'affaires tchèque actif dans l'énergie, la distribution et les médias.",
      economic: [
        "Énergie (EPH : production, réseaux, gaz)",
        "Distribution (participations dans Casino, Fnac-Darty)",
        "Presse : Marianne, Franc-Tireur"
      ],
      social: [
        "Ligne souverainiste / transpartisane pour Marianne, historiquement classée centre-gauche républicain",
        "Questions sur l'influence d'un actionnaire du secteur énergétique sur la couverture de ces sujets"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Daniel Křetínský", url: "https://fr.wikipedia.org/w/index.php?search=Daniel+Křetínský" },
        { label: "Wikipédia – Marianne", url: "https://fr.wikipedia.org/w/index.php?search=Marianne+hebdomadaire" }
      ]
    },
    {
      id: "pinault",
      name: "Artémis (Famille Pinault)",
      type: "prive",
      owner: "François Pinault et sa famille (holding Artémis)",
      country: "FR",
      summary: "Holding familiale actionnaire de contrôle de Kering et propriétaire de l'hebdomadaire Le Point.",
      economic: [
        "Luxe (Kering : Gucci, Saint Laurent, Balenciaga…)",
        "Art et enchères (Christie's), vins (Château Latour), sport (Stade Rennais)",
        "Presse : Le Point"
      ],
      social: [
        "Ligne éditoriale du Point classée centre-droit / libérale",
        "Question du conflit d'intérêts entre presse et annonceurs / activités du luxe"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Artémis (holding)", url: "https://fr.wikipedia.org/w/index.php?search=Artémis+holding+Pinault" },
        { label: "Wikipédia – Le Point", url: "https://fr.wikipedia.org/w/index.php?search=Le+Point+hebdomadaire" }
      ]
    },
    {
      id: "altice-media",
      name: "Altice Media (BFM, RMC)",
      type: "prive",
      owner: "Patrick Drahi (Altice) – propriété en évolution (cession à CMA CGM / famille Saadé annoncée)",
      country: "FR/LU",
      summary: "Pôle médias du groupe de télécoms Altice (SFR) : information en continu et radios.",
      economic: [
        "Télécoms et câble (SFR, Altice) – groupe très endetté",
        "Information en continu et radio (BFMTV, BFM Business, RMC, RMC Découverte, RMC Story)",
        "Recettes publicitaires"
      ],
      social: [
        "Information en continu grand public ; débats sur la place de l'éditorialisation et sur les relations entre l'opérateur télécom et ses médias"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Altice Media", url: "https://fr.wikipedia.org/w/index.php?search=Altice+Média+BFM" },
        { label: "Wikipédia – BFMTV", url: "https://fr.wikipedia.org/w/index.php?search=BFMTV" }
      ]
    },
    {
      id: "m6-rtl",
      name: "Groupe M6 / RTL Group (Bertelsmann)",
      type: "prive",
      owner: "RTL Group, contrôlé par le groupe allemand Bertelsmann (famille Mohn)",
      country: "FR/DE/LU",
      summary: "Groupe audiovisuel privé, filiale d'un des premiers groupes mondiaux de médias.",
      economic: [
        "Télévision (M6, W9, 6ter, Gulli) et radio (RTL, RTL2, Fun Radio)",
        "Bertelsmann : édition (Penguin Random House), services, musique, formation",
        "Recettes publicitaires"
      ],
      social: [
        "Télévision de divertissement grand public ; information relativement limitée sur M6, plus développée sur RTL"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Groupe M6", url: "https://fr.wikipedia.org/w/index.php?search=Groupe+M6" },
        { label: "Wikipédia – Bertelsmann", url: "https://fr.wikipedia.org/w/index.php?search=Bertelsmann" }
      ]
    },

    // ───────────────────── France : public / fondation ─────────────────────
    {
      id: "service-public-fr",
      name: "Audiovisuel public français",
      type: "public",
      owner: "État français (financement par dotation budgétaire ; holding France Médias envisagée / en discussion)",
      country: "FR",
      summary: "France Télévisions, Radio France, France Médias Monde, Arte France et l'INA : médias financés par des ressources publiques.",
      economic: [
        "Financement par le budget de l'État (depuis 2022, suppression de la redevance audiovisuelle) complété par la publicité sur France Télévisions",
        "Missions de service public : pluralisme, éducation, culture, information"
      ],
      social: [
        "Mission d'information pluraliste encadrée par l'Arcom",
        "Débats récurrents sur l'indépendance vis-à-vis du pouvoir politique (nomination des dirigeants, financement) et sur les accusations de biais, venant de tous bords"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – France Télévisions", url: "https://fr.wikipedia.org/w/index.php?search=France+Télévisions" },
        { label: "Wikipédia – Radio France", url: "https://fr.wikipedia.org/w/index.php?search=Radio+France" }
      ]
    },
    {
      id: "sipa-ouest-france",
      name: "SIPA – Ouest-France",
      type: "fondation",
      owner: "Association pour le soutien des principes de la démocratie humaniste (association à but non lucratif, d'inspiration démocrate-chrétienne)",
      country: "FR",
      summary: "Premier quotidien français, détenu par une association et non par un actionnaire industriel.",
      economic: [
        "Presse régionale, petites annonces, publicité locale",
        "Pas d'actionnaire industriel : bénéfices réinvestis dans le groupe"
      ],
      social: [
        "Tradition démocrate-chrétienne / humaniste, ligne éditoriale centriste et régionale"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Ouest-France", url: "https://fr.wikipedia.org/w/index.php?search=Ouest-France" }
      ]
    },

    // ───────────────────── France : indépendants ─────────────────────
    {
      id: "independants-fr",
      name: "Presse indépendante (financement par les lecteurs)",
      type: "independant",
      owner: "Sociétés de journalistes / fonds de dotation / actionnaires lecteurs (selon le titre)",
      country: "FR",
      summary: "Médias financés principalement par abonnements ou dons, sans grand groupe industriel actionnaire.",
      economic: [
        "Abonnements, dons, ventes au numéro ; pas ou peu de publicité",
        "Mediapart et Arrêt sur images : modèle 100 % abonnés ; Le Canard enchaîné : ventes en kiosque sans publicité"
      ],
      social: [
        "Positionnements variés et assumés : Mediapart (enquête, centre-gauche / gauche), Arrêt sur images (critique des médias), L'Humanité (gauche, historiquement liée au PCF), Le Canard enchaîné (satirique, enquête)",
        "L'indépendance financière n'équivaut pas à la neutralité éditoriale"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Mediapart", url: "https://fr.wikipedia.org/w/index.php?search=Mediapart" },
        { label: "Wikipédia – Le Canard enchaîné", url: "https://fr.wikipedia.org/w/index.php?search=Le+Canard+enchaîné" }
      ]
    },

    // ───────────────────── International : privé ─────────────────────
    {
      id: "murdoch",
      name: "Famille Murdoch (Fox Corporation / News Corp)",
      type: "prive",
      owner: "Famille Murdoch (via un trust familial) – Fox Corporation et News Corp sont deux sociétés distinctes",
      country: "US/UK/AU",
      summary: "Empire médiatique anglophone, de la télévision d'information américaine à la presse britannique et australienne.",
      economic: [
        "Fox Corporation : Fox News, Fox Business, Fox Broadcasting, Tubi",
        "News Corp : Wall Street Journal, New York Post, HarperCollins, News UK (The Times, The Sun), titres australiens",
        "Recettes publicitaires, droits de retransmission, abonnements"
      ],
      social: [
        "Fox News et le New York Post sont généralement classés conservateurs / à droite ; le Wall Street Journal (éditorial) libéral-conservateur",
        "Influence politique débattue (aux États-Unis, au Royaume-Uni, en Australie)"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Fox Corporation", url: "https://en.wikipedia.org/w/index.php?search=Fox+Corporation" },
        { label: "Wikipedia – News Corp", url: "https://en.wikipedia.org/w/index.php?search=News+Corp" }
      ]
    },
    {
      id: "comcast",
      name: "Comcast / NBCUniversal",
      type: "prive",
      owner: "Comcast Corporation (société cotée ; famille Roberts actionnaire de contrôle du droit de vote)",
      country: "US/UK",
      summary: "Opérateur de câble et de médias propriétaire de NBC News, CNBC et Sky News.",
      economic: [
        "Câble, internet haut débit, parcs d'attractions, cinéma (Universal)",
        "Médias d'information : NBC News, CNBC, Sky News (MSNBC, désormais séparé dans la structure Versant – à vérifier)"
      ],
      social: [
        "NBC News généralement classée centre / centre-gauche aux États-Unis ; MSNBC plus à gauche ; CNBC orientée finance",
        "Sky News a un statut d'impartialité réglementé au Royaume-Uni"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Comcast", url: "https://en.wikipedia.org/w/index.php?search=Comcast" },
        { label: "Wikipedia – NBCUniversal", url: "https://en.wikipedia.org/w/index.php?search=NBCUniversal" }
      ]
    },
    {
      id: "disney",
      name: "The Walt Disney Company",
      type: "prive",
      owner: "Société cotée (actionnariat institutionnel diffus)",
      country: "US",
      summary: "Groupe de divertissement propriétaire de la chaîne ABC et de son pôle d'information ABC News.",
      economic: [
        "Parcs, films, streaming (Disney+, Hulu), ESPN",
        "ABC News dans un groupe dont l'activité principale est le divertissement"
      ],
      social: [
        "ABC News généralement classée centre / centre-gauche ; sensibilité du groupe aux pressions politiques et réglementaires"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – The Walt Disney Company", url: "https://en.wikipedia.org/w/index.php?search=The+Walt+Disney+Company" }
      ]
    },
    {
      id: "paramount",
      name: "Paramount Skydance",
      type: "prive",
      owner: "Skydance / famille Ellison (après fusion avec Paramount Global en 2025)",
      country: "US",
      summary: "Groupe de cinéma et de télévision propriétaire de CBS et CBS News.",
      economic: [
        "Cinéma (Paramount Pictures), télévision (CBS, MTV, Comedy Central), streaming (Paramount+)",
        "Famille Ellison également liée à Oracle (technologie)"
      ],
      social: [
        "CBS News historiquement classée centre ; débats récents sur l'indépendance éditoriale après le changement d'actionnaire"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Paramount Skydance", url: "https://en.wikipedia.org/w/index.php?search=Paramount+Skydance" }
      ]
    },
    {
      id: "wbd",
      name: "Warner Bros. Discovery",
      type: "prive",
      owner: "Société cotée ; restructuration / séparation d'activités en cours – à vérifier",
      country: "US",
      summary: "Groupe de cinéma, télévision et streaming propriétaire de CNN.",
      economic: [
        "Cinéma (Warner Bros.), HBO / Max, chaînes thématiques (Discovery, TNT…)",
        "CNN : information en continu financée par les abonnements câble et la publicité"
      ],
      social: [
        "CNN généralement classée centre-gauche / libérale aux États-Unis, régulièrement critiquée à gauche comme à droite",
        "Dette élevée du groupe et restructurations pesant sur les rédactions"
      ],
      confidence: "a-verifier",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Warner Bros. Discovery", url: "https://en.wikipedia.org/w/index.php?search=Warner+Bros.+Discovery" },
        { label: "Wikipedia – CNN", url: "https://en.wikipedia.org/w/index.php?search=CNN" }
      ]
    },
    {
      id: "bezos",
      name: "Jeff Bezos (Amazon / Washington Post)",
      type: "prive",
      owner: "Jeff Bezos (à titre personnel pour le Washington Post, fondateur d'Amazon)",
      country: "US",
      summary: "Le Washington Post appartient à son fondateur d'Amazon depuis 2013, via son véhicule d'investissement personnel.",
      economic: [
        "Amazon : commerce en ligne, cloud (AWS), publicité, streaming – grands contrats publics (CIA, Pentagone via AWS)",
        "Blue Origin (spatial), propriété du Washington Post"
      ],
      social: [
        "Washington Post classé centre-gauche / libéral ; ses pages « opinion » ont connu des inflexions récentes suscitant polémique",
        "Débat sur les conflits d'intérêts entre contrats fédéraux d'Amazon et couverture du pouvoir"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – The Washington Post", url: "https://en.wikipedia.org/w/index.php?search=The+Washington+Post" }
      ]
    },
    {
      id: "nyt",
      name: "The New York Times Company",
      type: "prive",
      owner: "Société cotée ; famille Ochs-Sulzberger (actions de classe B, contrôle)",
      country: "US",
      summary: "Groupe de presse coté dont la famille fondatrice conserve le contrôle via une structure d'actions à droits spéciaux.",
      economic: [
        "Abonnements numériques (journal, Games, Cooking, The Athletic)",
        "Publicité"
      ],
      social: [
        "Ligne éditoriale classée centre-gauche / libérale ; critiquée à gauche comme à droite"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – The New York Times Company", url: "https://en.wikipedia.org/w/index.php?search=The+New+York+Times+Company" }
      ]
    },
    {
      id: "bloomberg",
      name: "Bloomberg L.P.",
      type: "prive",
      owner: "Michael Bloomberg (actionnaire majoritaire)",
      country: "US",
      summary: "Groupe d'information financière dont l'activité principale est la vente de terminaux de données.",
      economic: [
        "Terminaux Bloomberg (données, analyses, messagerie pour professionnels de la finance)",
        "Bloomberg News, Bloomberg Television",
        "Philanthropie et engagement politique de son fondateur (ancien maire de New York)"
      ],
      social: [
        "Couverture économique de référence pour les marchés ; orientation libérale / centriste"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Bloomberg L.P.", url: "https://en.wikipedia.org/w/index.php?search=Bloomberg+L.P." }
      ]
    },
    {
      id: "thomson-reuters",
      name: "Thomson Reuters",
      type: "prive",
      owner: "Woodbridge Company (famille Thomson), actionnaire majoritaire d'une société cotée",
      country: "CA/UK",
      summary: "Groupe d'information professionnelle dont l'agence Reuters est la branche d'actualité.",
      economic: [
        "Services d'information juridique, fiscale et financière (revenus principaux)",
        "Agence de presse Reuters"
      ],
      social: [
        "Agence de presse revendiquant l'objectivité (Reuters Trust Principles)"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Thomson Reuters", url: "https://en.wikipedia.org/w/index.php?search=Thomson+Reuters" }
      ]
    },

    // ───────────────────── International : public / fondation ─────────────────────
    {
      id: "bbc",
      name: "BBC (service public britannique)",
      type: "public",
      owner: "Corporation publique sous charte royale ; financée principalement par la redevance (licence fee)",
      country: "UK",
      summary: "Radiodiffuseur public britannique.",
      economic: [
        "Financement par la redevance audiovisuelle, complété par la vente de programmes (BBC Studios)",
        "Soumis à une charte royale et à la régulation de l'Ofcom"
      ],
      social: [
        "Obligation d'impartialité ; accusations de biais venant à la fois de la gauche et de la droite",
        "Indépendance débattue à chaque renouvellement de la charte et du financement"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – BBC", url: "https://en.wikipedia.org/w/index.php?search=BBC" }
      ]
    },
    {
      id: "guardian-trust",
      name: "Scott Trust (The Guardian)",
      type: "fondation",
      owner: "Scott Trust Limited, fondation à but non lucratif ; pas d'actionnaire privé",
      country: "UK",
      summary: "Le Guardian appartient à une fondation dont l'objet est de garantir son indépendance éditoriale.",
      economic: [
        "Dons de lecteurs, abonnements, publicité et fonds de dotation (Guardian Media Group)"
      ],
      social: [
        "Ligne éditoriale classée centre-gauche / progressiste"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Scott Trust", url: "https://en.wikipedia.org/w/index.php?search=Scott+Trust" }
      ]
    },
    {
      id: "afp",
      name: "Agence France-Presse (AFP)",
      type: "public",
      owner: "Organisme autonome à statut particulier (loi de 1957) ; l'État est l'un de ses principaux clients",
      country: "FR",
      summary: "Agence de presse mondiale dont le statut garantit l'autonomie vis-à-vis de l'État.",
      economic: [
        "Vente de services d'information (dont abonnements des administrations publiques – une part importante du chiffre d'affaires) aux médias et entreprises"
      ],
      social: [
        "Statut garantissant l'indépendance éditoriale ; conseil d'administration associant presse, personnel et représentants de l'État"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – Agence France-Presse", url: "https://fr.wikipedia.org/w/index.php?search=Agence+France-Presse" }
      ]
    },

    // ───────────────────── Médias d'État étrangers ─────────────────────
    {
      id: "qatar-aj",
      name: "Al Jazeera Media Network (Qatar)",
      type: "etat-etranger",
      owner: "Financement par l'État du Qatar (famille régnante Al Thani)",
      country: "QA",
      summary: "Réseau d'information international financé par l'État du Qatar.",
      economic: [
        "Financement public qatari ; l'État du Qatar a des intérêts majeurs dans le gaz, la finance et le sport"
      ],
      social: [
        "Reconnu pour une couverture étendue du monde arabe ; accusations de proximité avec la politique étrangère qatarie et d'alignements sur certains courants (notamment islamistes politiques) ; la chaîne conteste ces reproches"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – Al Jazeera", url: "https://en.wikipedia.org/w/index.php?search=Al+Jazeera+Media+Network" }
      ]
    },
    {
      id: "russia-rt",
      name: "RT (Russia Today) – État russe",
      type: "etat-etranger",
      owner: "Financé par le budget de l'État russe (ANO TV-Novosti)",
      country: "RU",
      summary: "Média international financé par l'État russe ; soumis à des sanctions et interdictions de diffusion dans l'Union européenne depuis 2022.",
      economic: [
        "Financement public russe"
      ],
      social: [
        "Considéré par l'UE, le Royaume-Uni et les États-Unis comme un instrument de propagande et de désinformation au service de l'État russe"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipédia – RT (média)", url: "https://fr.wikipedia.org/w/index.php?search=RT+Russia+Today" }
      ]
    },
    {
      id: "china-state",
      name: "Médias d'État chinois (CGTN, Xinhua…)",
      type: "etat-etranger",
      owner: "Parti communiste chinois / État chinois (CMG pour CGTN)",
      country: "CN",
      summary: "Médias d'État placés sous la direction du Parti communiste chinois.",
      economic: [
        "Financement public chinois"
      ],
      social: [
        "Ligne éditoriale alignée sur le Parti communiste chinois ; classés comme médias contrôlés par l'État par l'ONG Reporters sans frontières et les organismes de régulation occidentaux"
      ],
      confidence: "etabli",
      asOf: "2025-06",
      sources: [
        { label: "Wikipedia – CGTN", url: "https://en.wikipedia.org/w/index.php?search=CGTN" }
      ]
    }
  ],

  entities: [
    // Bolloré
    { id: "cnews", name: "CNews", group: "bollore", kind: "Chaîne d'information", youtube: ["CNEWS"], x: ["CNEWS"], domains: ["cnews.fr"], aliases: ["CNEWS", "CNews"] },
    { id: "europe1", name: "Europe 1", group: "bollore", kind: "Radio", youtube: ["Europe1"], x: ["Europe1"], domains: ["europe1.fr"], aliases: ["Europe 1"] },
    { id: "jdd", name: "Le Journal du Dimanche", group: "bollore", kind: "Presse hebdomadaire", youtube: [], x: ["leJDD"], domains: ["lejdd.fr"], aliases: ["JDD", "Le JDD"] },
    { id: "paris-match", name: "Paris Match", group: "bollore", kind: "Magazine", youtube: ["parismatch"], x: ["ParisMatch"], domains: ["parismatch.com"], aliases: [] },
    { id: "canal-plus", name: "Canal+", group: "bollore", kind: "Chaîne payante", youtube: ["canalplus"], x: ["canalplus"], domains: ["canalplus.com"], aliases: [] },
    // Bouygues
    { id: "tf1", name: "TF1", group: "bouygues", kind: "Chaîne généraliste", youtube: ["TF1"], x: ["TF1"], domains: ["tf1.fr"], aliases: [] },
    { id: "tf1-info", name: "TF1 Info", group: "bouygues", kind: "Information", youtube: ["TF1Info"], x: ["TF1Info"], domains: ["tf1info.fr"], aliases: [] },
    { id: "lci", name: "LCI", group: "bouygues", kind: "Chaîne d'information", youtube: ["LCI"], x: ["LCI"], domains: ["lci.fr"], aliases: [] },
    // LVMH
    { id: "les-echos", name: "Les Échos", group: "lvmh-arnault", kind: "Presse économique", youtube: ["LesEchos"], x: ["LesEchos"], domains: ["lesechos.fr"], aliases: ["Les Echos"] },
    { id: "le-parisien", name: "Le Parisien", group: "lvmh-arnault", kind: "Presse quotidienne", youtube: ["LeParisien"], x: ["le_Parisien"], domains: ["leparisien.fr"], aliases: [] },
    { id: "radio-classique", name: "Radio Classique", group: "lvmh-arnault", kind: "Radio", youtube: [], x: ["RadioClassique"], domains: ["radioclassique.fr"], aliases: [] },
    // Dassault
    { id: "le-figaro", name: "Le Figaro", group: "dassault", kind: "Presse quotidienne", youtube: ["lefigaro"], x: ["Le_Figaro", "lefigaro"], domains: ["lefigaro.fr"], aliases: [] },
    // Le Monde
    { id: "le-monde-journal", name: "Le Monde", group: "le-monde", kind: "Presse quotidienne", youtube: ["lemonde"], x: ["lemondefr", "lemonde_en"], domains: ["lemonde.fr"], aliases: [] },
    { id: "l-obs", name: "L'Obs", group: "le-monde", kind: "Magazine", youtube: [], x: ["lobs"], domains: ["nouvelobs.com", "lobs.fr"], aliases: ["Le Nouvel Obs", "L'Obs"] },
    { id: "telerama", name: "Télérama", group: "le-monde", kind: "Magazine culturel", youtube: ["telerama"], x: ["Telerama"], domains: ["telerama.fr"], aliases: [] },
    { id: "courrier-international", name: "Courrier international", group: "le-monde", kind: "Magazine", youtube: [], x: ["Courrierinter"], domains: ["courrierinternational.com"], aliases: [] },
    // Kretinsky
    { id: "marianne", name: "Marianne", group: "kretinsky", kind: "Magazine", youtube: ["Marianne"], x: ["MarianneleMag"], domains: ["marianne.net"], aliases: [] },
    { id: "franc-tireur", name: "Franc-Tireur", group: "kretinsky", kind: "Presse hebdomadaire", youtube: [], x: ["franctireur_fr"], domains: ["franc-tireur.fr"], aliases: [] },
    // Pinault
    { id: "le-point", name: "Le Point", group: "pinault", kind: "Magazine", youtube: ["lepoint"], x: ["LePoint"], domains: ["lepoint.fr"], aliases: [] },
    // Altice
    { id: "bfmtv", name: "BFMTV", group: "altice-media", kind: "Chaîne d'information", youtube: ["BFMTV"], x: ["BFMTV"], domains: ["bfmtv.com"], aliases: ["BFM TV"] },
    { id: "bfm-business", name: "BFM Business", group: "altice-media", kind: "Chaîne économique", youtube: ["BFMBusiness"], x: ["BFMBusiness"], domains: [], aliases: [] },
    { id: "rmc", name: "RMC", group: "altice-media", kind: "Radio", youtube: ["RMC"], x: ["RMCInfo"], domains: ["rmc.fr"], aliases: [] },
    // M6
    { id: "m6", name: "M6", group: "m6-rtl", kind: "Chaîne généraliste", youtube: ["M6"], x: ["M6"], domains: ["m6.fr", "6play.fr"], aliases: [] },
    { id: "rtl-fr", name: "RTL (France)", group: "m6-rtl", kind: "Radio", youtube: ["RTLFrance"], x: ["RTLFrance"], domains: ["rtl.fr"], aliases: ["RTL France"] },
    // Public FR
    { id: "france-tv", name: "France Télévisions", group: "service-public-fr", kind: "Télévision publique", youtube: ["francetv"], x: ["francetele"], domains: ["france.tv"], aliases: [] },
    { id: "franceinfo", name: "franceinfo", group: "service-public-fr", kind: "Information publique", youtube: ["franceinfo"], x: ["franceinfo"], domains: ["francetvinfo.fr", "franceinfo.fr"], aliases: ["France Info"] },
    { id: "france-inter", name: "France Inter", group: "service-public-fr", kind: "Radio publique", youtube: ["franceinter"], x: ["franceinter"], domains: ["radiofrance.fr", "franceinter.fr"], aliases: [] },
    { id: "france-24", name: "France 24", group: "service-public-fr", kind: "Information internationale", youtube: ["FRANCE24"], x: ["FRANCE24"], domains: ["france24.com"], aliases: [] },
    { id: "rfi", name: "RFI", group: "service-public-fr", kind: "Radio internationale", youtube: ["RFI"], x: ["RFI"], domains: ["rfi.fr"], aliases: [] },
    { id: "arte", name: "Arte", group: "service-public-fr", kind: "Chaîne culturelle", youtube: ["arte"], x: ["ARTEfr"], domains: ["arte.tv"], aliases: ["ARTE"] },
    // Ouest-France
    { id: "ouest-france", name: "Ouest-France", group: "sipa-ouest-france", kind: "Presse régionale", youtube: ["OuestFrance"], x: ["ouestfrance"], domains: ["ouest-france.fr"], aliases: [] },
    // Indépendants
    { id: "mediapart", name: "Mediapart", group: "independants-fr", kind: "Presse en ligne", youtube: ["Mediapart"], x: ["Mediapart"], domains: ["mediapart.fr"], aliases: [] },
    { id: "asi", name: "Arrêt sur images", group: "independants-fr", kind: "Média en ligne", youtube: ["arretsurimages"], x: ["arretsurimages"], domains: ["arretsurimages.net"], aliases: [] },
    { id: "canard", name: "Le Canard enchaîné", group: "independants-fr", kind: "Presse hebdomadaire", youtube: [], x: ["canardenchaine"], domains: ["lecanardenchaine.fr"], aliases: [] },
    { id: "humanite", name: "L'Humanité", group: "independants-fr", kind: "Presse quotidienne", youtube: ["humanite"], x: ["humanite_fr"], domains: ["humanite.fr"], aliases: [] },
    // International
    { id: "fox-news", name: "Fox News", group: "murdoch", kind: "Chaîne d'information", youtube: ["FoxNews"], x: ["FoxNews"], domains: ["foxnews.com"], aliases: [] },
    { id: "wsj", name: "The Wall Street Journal", group: "murdoch", kind: "Presse économique", youtube: ["WSJ"], x: ["WSJ"], domains: ["wsj.com"], aliases: ["WSJ"] },
    { id: "ny-post", name: "New York Post", group: "murdoch", kind: "Presse", youtube: ["nypost"], x: ["nypost"], domains: ["nypost.com"], aliases: [] },
    { id: "the-times", name: "The Times", group: "murdoch", kind: "Presse", youtube: [], x: ["thetimes"], domains: ["thetimes.co.uk", "thetimes.com"], aliases: [] },
    { id: "the-sun", name: "The Sun", group: "murdoch", kind: "Presse", youtube: [], x: ["TheSun"], domains: ["thesun.co.uk"], aliases: [] },
    { id: "nbc-news", name: "NBC News", group: "comcast", kind: "Information TV", youtube: ["NBCNews"], x: ["NBCNews"], domains: ["nbcnews.com"], aliases: [] },
    { id: "cnbc", name: "CNBC", group: "comcast", kind: "Chaîne économique", youtube: ["CNBC"], x: ["CNBC"], domains: ["cnbc.com"], aliases: [] },
    { id: "msnbc", name: "MSNBC / MS NOW", group: "comcast", kind: "Chaîne d'information", youtube: ["msnbc"], x: ["MSNBC", "MS_NOW"], domains: ["msnbc.com"], aliases: ["MSNBC"] },
    { id: "sky-news", name: "Sky News", group: "comcast", kind: "Chaîne d'information", youtube: ["SkyNews"], x: ["SkyNews"], domains: ["news.sky.com", "skynews.com"], aliases: [] },
    { id: "abc-news", name: "ABC News", group: "disney", kind: "Information TV", youtube: ["ABCNews"], x: ["ABC"], domains: ["abcnews.go.com"], aliases: [] },
    { id: "cbs-news", name: "CBS News", group: "paramount", kind: "Information TV", youtube: ["CBSNews"], x: ["CBSNews"], domains: ["cbsnews.com"], aliases: [] },
    { id: "cnn", name: "CNN", group: "wbd", kind: "Chaîne d'information", youtube: ["CNN"], x: ["CNN"], domains: ["cnn.com"], aliases: [] },
    { id: "washington-post", name: "The Washington Post", group: "bezos", kind: "Presse quotidienne", youtube: ["washingtonpost"], x: ["washingtonpost"], domains: ["washingtonpost.com"], aliases: [] },
    { id: "nyt-entity", name: "The New York Times", group: "nyt", kind: "Presse quotidienne", youtube: ["nytimes"], x: ["nytimes"], domains: ["nytimes.com"], aliases: ["NYT"] },
    { id: "bloomberg-news", name: "Bloomberg", group: "bloomberg", kind: "Information financière", youtube: ["business", "BloombergTelevision"], x: ["business", "markets"], domains: ["bloomberg.com"], aliases: [] },
    { id: "reuters", name: "Reuters", group: "thomson-reuters", kind: "Agence de presse", youtube: ["Reuters"], x: ["Reuters"], domains: ["reuters.com"], aliases: [] },
    { id: "bbc-news", name: "BBC News", group: "bbc", kind: "Information publique", youtube: ["BBCNews"], x: ["BBCWorld", "BBCNews", "BBCBreaking"], domains: ["bbc.com", "bbc.co.uk"], aliases: [] },
    { id: "guardian", name: "The Guardian", group: "guardian-trust", kind: "Presse quotidienne", youtube: ["Guardian"], x: ["guardian"], domains: ["theguardian.com"], aliases: [] },
    { id: "afp-entity", name: "AFP", group: "afp", kind: "Agence de presse", youtube: ["AFP"], x: ["AFP"], domains: ["afp.com"], aliases: ["Agence France-Presse"] },
    { id: "al-jazeera", name: "Al Jazeera", group: "qatar-aj", kind: "Chaîne d'information", youtube: ["aljazeeraenglish", "aljazeera"], x: ["AJEnglish", "AJArabic", "AlJazeera"], domains: ["aljazeera.com", "aljazeera.net"], aliases: [] },
    { id: "rt", name: "RT", group: "russia-rt", kind: "Média d'État", youtube: [], x: ["RT_com"], domains: ["rt.com"], aliases: ["Russia Today"] },
    { id: "cgtn", name: "CGTN", group: "china-state", kind: "Média d'État", youtube: ["CGTN"], x: ["CGTNOfficial"], domains: ["cgtn.com"], aliases: [] },
    { id: "xinhua", name: "Xinhua", group: "china-state", kind: "Agence d'État", youtube: [], x: ["XHNews"], domains: ["xinhuanet.com"], aliases: ["新华社"] }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = MOM_DATA;
} else {
  globalThis.MOM_DATA = MOM_DATA;
}
