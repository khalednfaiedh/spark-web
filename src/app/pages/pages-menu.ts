import { NbMenuItem } from '@nebular/theme';
import { TaxeComponent } from './admin/taxe/taxe.component';
import {
  FamilleDeProduitComponent
} from './admin/famille-de-produit/famille-de-produit.component';
import { FactureComponent } from './vente/facture/facture.component';

import { DevisClientComponent } from './vente/devis-client/devis-client.component';
import {
  DemandePrixClientComponent
} from './vente/demande-prix-client/demande-prix-client.component';
import { ClientComponent } from './admin/client/client.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import {
  TarifsDeVenteComponent
} from './vente/tarifs-de-vente/tarifs-de-vente.component';
import { FactureAvoirComponent } from './vente/facture-avoir/facture-avoir.component';
import { SuividePaiementComponent } from './vente/suivide-paiement/suivide-paiement.component';
import { BonDeLivraisonComponent } from './vente/bon-de-livraison/bon-de-livraison.component';
import { ClientEvaluationComponent } from './vente/evaluation-client/client-evaluation/client-evaluation.component';
import { ProductComponent } from './admin/product/product.component';
import { ConditionnementEmballageProductComponent } from './admin/conditionnement-emballage-product/conditionnement-emballage-product.component';
import { CritereEvaluationComponent } from './vente/evaluation-client/critere-evaluation/critere-evaluation.component';
import { ModeDePaiementComponent } from './admin/mode-de-paiement/mode-de-paiement.component';
import { ConditionDePaiementComponent } from './admin/condition-de-paiement/condition-de-paiement.component';
import { FilesComponent } from './admin/files/files.component';
import { Authorities } from '../authorisation/authorities';
import { AuthorisationCompta } from '../authorisation/authorisationCompta';
import { FournisseurComponent } from './admin/fournisseur/fournisseur.component';
import { EmplacementComponent } from './stock/emplacement/emplacement.component';
import { InventaireComponent } from './stock/inventaire/inventaire.component';
import { MagasinComponent } from './stock/magasin/magasin.component';
import { MouvementComponent } from './stock/mouvement/mouvement.component';
import { PersonnelComponent } from './stock/personnel/personnel.component';
import { RapportComponent } from './stock/rapport/rapport.component';
import { BonCommandeComponent } from './achat/bon-commande/bon-commande.component';
import { ContratFournisseurComponent } from './achat/contrat-fournisseur/contrat-fournisseur.component';
import { DemandeAchatComponent } from './achat/demande-achat/demande-achat.component';
import { DemandePrixAchatComponent } from './achat/demande-prix-achat/demande-prix-achat.component';
import { DevisAchatComponent } from './achat/devis-achat/devis-achat.component';
import { FournisseurOrderComponent } from './achat/evaluation-fournisseur/fournisseur-order/fournisseur-order.component';
import { CritereQualiteComponent } from './stock/critere-qualite/critere-qualite.component';
import { BonDeLivraisonAchatComponent } from './achat/bon-de-livraison-achat/bon-de-livraison-achat.component';
import { AuthoritiesEmploye } from '../authorisation/authoritiesEmploye';
import { AuthoritiesUser } from '../authorisation/authorities-user';
import { AuthoritiesProduct } from '../authorisation/authorities-product';
import { AuthoritiesFamilleDeProduit } from '../authorisation/authorities-famille-de-produit';
import { AuthoritiesConditionnementEmballage } from '../authorisation/authorities-conditionnement-emballage';
import { AuthoritiesUniteMesure } from '../authorisation/authorities-unite-mesure';
import { AuthoritiesTaxe } from '../authorisation/authorities-taxe';
import { AuthoritiesBanque } from '../authorisation/authorities-banque';
import { AuthoritiesFormeJuridique } from '../authorisation/authorities-forme-juridique';
import { AuthoritiesEntreprise } from '../authorisation/authoritiesEntreprise';
import { AuthoritiesFichePaie } from '../authorisation/authoritiesFichePaie';
import { AuthoritiesConge } from '../authorisation/authoritiesConge';
import { adminsAuthorities } from '../authorisation/admins';
import { AuthoritiesClient } from '../authorisation/authorities-client';
import { AuthoritiesFournisseur } from '../authorisation/authorities-fournisseur';
import { AuthoritiesCritere } from '../authorisation/authorities-critere';
import { AuthoritiesModeDePaiement } from '../authorisation/authorities-mode-de-paiement';
import { AuthoritiesConditionsPaiement } from '../authorisation/authorities-condition-de-paiement';
import { AuthoritiesUniteeTransaction } from '../authorisation/authoritiesUniteeTransaction';
import { AuthorisationEtatFianance } from '../authorisation/authorisationEtatFinance';
import { AuthoritiesDemandePrixClient } from '../authorisation/authorities-demande-prix-client';
import { AuthoritiesDevisClient } from '../authorisation/authorities-devis-client';
import { AuthoritiesCommande } from '../authorisation/authorities-commande';
import { AuthoritiesFacture } from '../authorisation/authorities-facture';
import { AuthoritiesFactureAvoirs } from '../authorisation/authorities-facture-avoirs';
import { AuthoritiesSuiviPaiement } from '../authorisation/authorities-suivi-paiement';
import { AuthoritiesLivraison } from '../authorisation/authorities-livraison';
import { AuthoritiesEvaluationClient } from '../authorisation/authorities-evaluation-client';
import { AuthoritiesRegime } from '../authorisation/authoritiesRegime';
import { AuthoritiesCongeType } from '../authorisation/authoritiesCongeType';
import { AuthoritiesTypePrime } from '../authorisation/authoritiesTypePrime';
import { AuthoritiesJoursFeries } from '../authorisation/authoritiesJoursFeries';
import { AuthoritiesCategorieCnss } from '../authorisation/authoritiesCategorieCNSS';
import { CommandeComponent } from './vente/commande/commande.component';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Admin',
    //  hidden: !Authorities.hasAutorities(adminsAuthorities.ADMIN_ADMIN),
    icon: 'nb-keypad',
    children: [
      {
        title: 'Entreprise',
        hidden: !Authorities.hasAutorities(AuthoritiesEntreprise.ENTREPRISE),
        link: '/pages/admin/entreprise',
      },
      {
        title: 'Utilisateurs',
        hidden: !Authorities.hasAutorities(AuthoritiesUser.USER),
        link: UtilisateurComponent.urlUtilisateur,
      },
      {
        title: 'Clients',
        hidden: !Authorities.hasAutorities(AuthoritiesClient.CLIENT_LIST_VALUE),
        link: ClientComponent.urlClient,
      },
      {
        title: 'Fournisseurs',
        hidden: !Authorities.hasAutorities(AuthoritiesFournisseur.FOURNISSEUR_VALUE),
        link: FournisseurComponent.urlFournisseur,
      },
      {
        title: 'Produits',
        hidden: !Authorities.hasAutorities(AuthoritiesProduct.PRODUCT_VALUE),
        link: ProductComponent.urlProduct,
      },
      {
        title: 'Machines',
        hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/machine',
      },
    ]
  },
  {
    title: 'CRM',
    hidden: !Authorities.hasAutorities(adminsAuthorities.CRM_ADMIN),
    icon: 'nb-list',
    children: [
      //   {
      //     title: 'Acceuil',
      //     link: '/pages/crm/dashboard',
      //  //   icon: 'nb-home',
      //   },
      {
        title: 'Calendriers',
        link: '/pages/crm/calandrier',
      }, {
        title: 'Prospects',
        link: '/pages/crm/prospects',
      }, {
        title: 'Affaires',
        link: '/pages/crm/affaire',
      },
      {
        title: 'Prospecteurs',
        link: '/pages/crm/prospecteurs',
      }, {
        title: 'Planning ',
        link: '/pages/crm/planning',
      },
      {
        title: 'Paramétrage',
        link: '/pages/crm/supervise',
      },
      {
        title: 'Tableau de bord',
        // icon: 'nb-bar-chart',
        link: '/pages/crm/stats',
      }
    ]
  },

  /*--------------------- MENU VENTE------------------------------------------*/

  {
    title: 'Vente',
    //hidden: !Authorities.hasAutorities(adminsAuthorities.VENTE_ADMIN),
    icon: 'nb-e-commerce',
    children: [

      {
        title: "Demande Prix d'un client",
        hidden: !Authorities.hasAutorities(AuthoritiesDemandePrixClient.DEMANDE_PRIX_CLIENT_LIST_VALUE),
        link: DemandePrixClientComponent.urlDemandePrixClient,

      }
      , {
        title: "Devis d'un client",
        hidden: !Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_LIST_VALUE),
        link: DevisClientComponent.urlDevisClient,

      },
      {
        title: 'Commandes ',
        hidden: !Authorities.hasAutorities(AuthoritiesCommande.COMMANDE_LIST_VALUE),
        link: CommandeComponent.urlCommande,
      },
      {
        title: 'Facture ',
        hidden: !Authorities.hasAutorities(AuthoritiesFacture.FACTURE_LIST_VALUE),
        // icon: 'fa fa-file-invoice',
        link: FactureComponent.urlFacture,

      },
      {
        title: 'Contrat Client',
        //hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        // icon: 'fa fa-file-invoice',
        link: '/pages/vente/contratClient'

      },
      {
        title: 'Facture Avoir',
        //  icon: 'nb-alert',
        hidden: !Authorities.hasAutorities(AuthoritiesFactureAvoirs.FACTURE_AVOIRS_LIST_VALUE),
        link: FactureAvoirComponent.urlFactureAvoir,
      },
      {
        title: 'Suivie paiement',
        hidden: !Authorities.hasAutorities(AuthoritiesSuiviPaiement.SUIVI_PAIEMENT_LIST_VALUE),
        //  icon: 'ion-card',
        link: SuividePaiementComponent.urlSuiviPaiement,
      },
      {
        title: 'Suivi livraison',
        hidden: !Authorities.hasAutorities(AuthoritiesLivraison.LIVRAISON_LIST_VALUE),
        //  icon: 'nb-shuffle',
        link: BonDeLivraisonComponent.urlBonLivraison,

      },
      {
        title: 'Evaluation Client',
        hidden: !Authorities.hasAutorities(AuthoritiesEvaluationClient.EVALUATION_CLIENT_LIST_VALUE),
        // icon: 'nb-star',
        link: ClientEvaluationComponent.urlClientEvaluation,

      }
    ]
  },

  /*---------------------FIN MENU VENTE--------------------------------------*/
  {
    title: 'Achat',
    hidden: !Authorities.hasAutorities(adminsAuthorities.ACHAT_ADMIN),
    icon: 'nb-arrow-dropright',
    children: [
      {
        title: "Proposition d'achat",
        //icon: 'nb-compose',
        link: DemandeAchatComponent.urlDemandeAchat,
      },
      {
        title: "Demande de prix",
        //icon: "nb-play-outline",
        link: DemandePrixAchatComponent.urlDemandePrixAchat,
      },
      {
        title: "Contrat d'un fournisseur",
        //icon: 'nb-keypad',
        link: ContratFournisseurComponent.urlContratFournisseur,
      },
      {
        title: "Devis d'achat",
        //icon: 'nb-tables',
        link: DevisAchatComponent.urlDevisAchat,
      },
      {
        title: "Bon de commande d'achat",
        //icon: 'nb-plus-circled',
        link: BonCommandeComponent.urlBonCommande
      },

      {
        title: "Bon de livraison d'achat",
        //icon: 'nb-plus-circled',
        link: BonDeLivraisonAchatComponent.urlBonDeLivraisonAchat
      },
      {
        title: 'Evaluation des fournisseurs',
        //icon: 'nb-alert',
        link: FournisseurOrderComponent.urlOrderFournisseur
      }
    ]
  },
  {
    title: 'Stock',
    hidden: !Authorities.hasAutorities(adminsAuthorities.STOCK_ADMIN),
    icon: 'nb-square',
    children: [
      {
        title: 'Acceuil',
        //icon: 'nb-home',
        link: '/pages/stock/dashbord',
      },
      {
        title: 'Magasin',
        //icon: 'nb-home',
        link: MagasinComponent.urlMagasin,
      },
      {
        title: 'Emplacement',
        //icon: 'nb-keypad',
        link: EmplacementComponent.urlEmplacement,
      },
      {
        title: 'Entrée stock',
        link: '/pages/stock/entrees',
      },
      {
        title: 'Sortie stock',
        link: '/pages/stock/sorties',
      },
      {
        title: 'Transfert',
        link: '/pages/stock/transfert',
      },
      // {
      //   title: 'Entrée Article',
      //   //icon: 'ion-arrow-right-c',
      //  link: EntreeArticleComponent.urlEntre,
      // },
      {
        title: 'Mouvements ',
        //icon: 'nb-angle-double-right',
        link: '/pages/stock/mouvement',
      },
      {
        title: 'Inventaire',
        //icon: 'nb-layout-default',
        link: InventaireComponent.urlInventaire,
      },
      {
        title: 'Rapport',
        //icon: 'nb-compose',
        link: RapportComponent.urlRapport,
      },
      {
        title: 'Critére Qualité',
        link: CritereQualiteComponent.urlCritereQualite,
      },
      {
        title: 'Personnels ',
        //icon: 'nb-person',
        link: PersonnelComponent.urlPersonnel,
      },
      {
        title: 'Paramétrage des produits ',
        //icon: 'nb-person',
        link: '/pages/stock/produit',
      },

    ]
  },
  {
    title: 'RH',
    hidden: !Authorities.hasAutorities(adminsAuthorities.RH_ADMIN),
    icon: 'nb-compose',
    children: [
      {
        title: 'Employés',
        hidden: !Authorities.hasAutorities(AuthoritiesEmploye.EMPLOYEE_VALUE),
        link: '/pages/rh/employe',
      },
      {
        title: 'Paie',
        hidden: !Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_VALUE),
        link: '/pages/rh/paie',
      },
      {
        title: 'Congés',
        hidden: !Authorities.hasAutorities(AuthoritiesConge.CONGE_VALUE),
        link: '/pages/rh/conge',
      },
      {
        title: 'Régime Horaire',
        hidden: !Authorities.hasAutorities(AuthoritiesRegime.REGIME_LIST_VALUE),
        link: '/pages/parametrage/regime',
      },
      {
        title: 'Types de congés',
        hidden: !Authorities.hasAutorities(AuthoritiesCongeType.CONGE_TYPE_VALUE),
        link: '/pages/parametrage/conge',
      },
      {
        title: 'Type de primes',
        hidden: !Authorities.hasAutorities(AuthoritiesTypePrime.TYPE_PRIME_VALUE),
        link: '/pages/parametrage/primes',
      }, {
        title: 'Impôts ',
        hidden: !Authorities.hasAutorities(adminsAuthorities.PARAM_RH),
        link: '/pages/parametrage/impots',
      }, {
        title: 'Abattements',
        hidden: !Authorities.hasAutorities(adminsAuthorities.PARAM_RH),
        link: '/pages/parametrage/abattement',
      },
      {
        title: 'IRPP',
        hidden: !Authorities.hasAutorities(adminsAuthorities.PARAM_RH),
        link: '/pages/parametrage/irpp',
      },
      {
        title: 'Jours feriés',
        hidden: !Authorities.hasAutorities(AuthoritiesJoursFeries.JOURS_FERIES_VALUE),
        link: '/pages/parametrage/joursferie',
      },
      {
        title: 'Catégories CNSS',
        hidden: !Authorities.hasAutorities(AuthoritiesCategorieCnss.CATEGORIE_CNSS_VALUE),
        link: '/pages/parametrage/categorie'
      },

    ]
  },
  {
    title: 'Comptabilité',
    hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
    icon: 'nb-grid-b',
    children: [


      {
        title: 'Traitements et saisies',
        hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
        children: [
          {
            title: 'Exercices ',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            link: '/pages/comptabilite/exercice',
          },
          // {
          //   title: " La Saisie  Par Lot",
          //   hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          //   link: '/pages/comptabilite/ecritureOpenWindow'
          // },
          {
            title: "Rapprochement bancaire  ",
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            link: '/pages/comptabilite/continueRapprochement'
          },
          {
            title: "Modéle écriture",
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            link: '/pages/comptabilite/listModeleEcriture'
          },

          // {
          //   title: "Déclartion TVA",
          //   hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          //   link: '/pages/comptabilite/declartionTVA'
          // },
          // {
          //   title: "Paramétrage   Déclartion TVA",
          //   hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          //   link: '/pages/comptabilite/parametreTVA'
          // },
          // {
          //   title: 'Report à nouveau manuelle ',
          //   hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          //   link: '/pages/comptabilite/repport',
          // },
        ]
      },
      {
        title: 'Strucutre et etats',
        hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),

        children: [
          {
            title: 'Plan générale',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            link: '/pages/comptabilite/planGeneral'
          },
          {
            title: 'Plan tiers',
            link: '/pages/comptabilite/planTiers',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          },
          {
            title: 'Import-export PC',
            link: '/pages/comptabilite/import-export',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),

          }, {
            title: 'Grand livre générale',
            link: '/pages/comptabilite/grandLivre',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),

          },
          {
            title: 'Grand livre tiers',

            link: '/pages/comptabilite/grandLivreTiers'
            ,
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),

          },

          {
            title: 'Balance  générale',

            link: '/pages/comptabilite/balanceGeneral',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
          },
          {
            title: 'Balance   tiers',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            // link: '/pages/comptabilite/balanceTiers'
          },
          {
            title: 'Livre journal  ',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            link: '/pages/comptabilite/livreJournal',
            children: [
              {
                title: 'Par  mois',
                hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
                link: '/pages/comptabilite/livreJournal',
              },
              {
                title: 'Centralisé',
                hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
                link: '/pages/comptabilite/journalCentralisee'
              },]
          },
          {
            title: 'Lettrage',
            hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
            children: [

              {
                title: 'Compte  général',
                hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
                link: '/pages/comptabilite/lettrages'
              },
              {
                title: 'Compte  tiers',
                link: '/pages/comptabilite/lettragesTiers',
                hidden: !Authorities.hasAutorities(AuthorisationCompta.AUTHORISATION),
              }
            ]
          }
        ]
      },
      {
        title: 'Etat Financier',
        hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),

        children: [
          {

            title: 'Actif',
            hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),
            link: '/pages/comptabilite/actifs',
          },
          {

            title: 'Passif',
            hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),
            link: '/pages/comptabilite/passifs',
          },
        ]
      },
      {
        title: 'Calcul Ratio',
        hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),

        children: [
          {
            title: 'Ratios de structure',
            hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),
            link: '/pages/comptabilite/ratio',
          },
          {
            title: 'Ratios de rentabilité',
            hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),
            link: '/pages/comptabilite/ratioRentabilite',
          },
          {
            title: 'Ratios d"équilibre Financier',
            //    hidden: !Authorities.hasAutorities(AuthorisationEtatFianance.AUTHORISATION),
            link: '/pages/comptabilite/ratioEquilibreFinancier',
          },
        ]
      },
    ]
  },

  /*************************   GPAO      ***************************************************** */
  {
    title: 'GPAO',
    hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
    icon: 'nb-grid-b',
    children: [
      {

        title: 'Atelier',
        link: '/pages/admin/atelier'
      },

      {
        title: 'Nomenclature',
        link: '/pages/gpao/nomenclature'
      },

      {
        title: 'Gammes Opératoire',
        link: '/pages/gpao/gammesOperatoire'
      },
      {
        title: 'Phase',
        link: '/pages/gpao/phase'
      },
      {
        title: 'Opération',
        link: '/pages/gpao/operation'
      },
      {
        title: 'Demande produit',
        link: '/pages/gpao/demande'
      },
      {
        title: 'PDP',
        link: '/pages/gpao/pdp'
      },
      {
        title: 'B.L Production',
        link: '/pages/gpao/bl-prod'
      },
    ]
  },
  {
    title: 'Paramétrage',
    // hidden: !Authorities.hasAutorities(adminsAuthorities.PARAM_ADMIN),
    icon: 'nb-gear',
    children: [
      {
        title: 'Banques',
        hidden: !Authorities.hasAutorities(AuthoritiesBanque.BANQUE_VALUE),
        link: '/pages/admin/banque',
      },
      {
        title: 'Forme juridique',
        hidden: !Authorities.hasAutorities(AuthoritiesFormeJuridique.FORME_JURIDIQUE_VALUE),
        link: '/pages/admin/forme-juridique',
      }, {
        title: 'Unité de transaction',
        hidden: !Authorities.hasAutorities(AuthoritiesUniteeTransaction.UNITE_TRANSACTION),
        link: '/pages/admin/unite-de-transaction',
      },
      {
        title: 'Catégorie client',
        // hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/categorieClient'

      },
      {
        title: 'Catégorie machine',
        hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/categorieMachine'
      },
      {
        title: 'Taxe',
        hidden: !Authorities.hasAutorities(AuthoritiesTaxe.TAXE_VALUE),
        link: TaxeComponent.urlTaxe,
      },

      {
        title: 'Famille de produit',
        hidden: !Authorities.hasAutorities(AuthoritiesFamilleDeProduit.FAMILLE_DE_PRODUIT_VALUE),
        link: FamilleDeProduitComponent.urlFamilleDeProduit,
      },
      {
        title: 'Conditionnement',
        hidden: !Authorities.hasAutorities(AuthoritiesConditionnementEmballage.CONDITIONNEMENT_EMBALLAGE_VALUE),
        link: ConditionnementEmballageProductComponent.urlConditionnementEmballageProduct,
      },
      {
        title: 'Critere evaluation',
        hidden: !Authorities.hasAutorities(AuthoritiesCritere.CRITERE_VALUE),
        link: CritereEvaluationComponent.urlcritere,
      },
      {
        title: 'Mode de paiement',
        hidden: !Authorities.hasAutorities(AuthoritiesModeDePaiement.MODE_DE_PAIEMENT_VALUE),
        link: ModeDePaiementComponent.urlModeDePaiement,
      },
      {
        title: 'Condition de paiement',
        hidden: !Authorities.hasAutorities(AuthoritiesConditionsPaiement.CONDITIONS_DE_PAIEMENTS_VALUE),
        link: ConditionDePaiementComponent.urlconditionDePaiement,
      },

      {
        title: 'Unite Mesure',
        hidden: !Authorities.hasAutorities(AuthoritiesUniteMesure.UNITE_MESURE_VALUE),
        link: '/pages/admin/uniteMesure',
      },
      {
        title: 'Site',
        hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/entreprise/site'
      },
      {
        title: 'Catégorie fournisseur',
        hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/fournisseur-categorie'
      },
      {
        title: 'Grille de tarif',
        // hidden: !Authorities.hasAutorities(adminsAuthorities.CHANGEME),
        link: '/pages/admin/grilleTarifs'
      },
      {
        title: 'Tarifs de vente',
        link: TarifsDeVenteComponent.urlTarifsDeVente
      },
    ]
  },
  /**  *********************        FIN     ************************************        */

  {
    title: 'Calendriers',
    hidden: !Authorities.hasAutorities(adminsAuthorities.PROSPECTEUR),
    icon: 'nb-grid-b',
    link: '/pages/crm/calandrier',
  }, {
    title: 'Prospects',
    hidden: !Authorities.hasAutorities(adminsAuthorities.PROSPECTEUR),
    icon: 'nb-list',
    link: '/pages/crm/prospects',
  }, {
    title: 'Affaires',
    hidden: !Authorities.hasAutorities(adminsAuthorities.PROSPECTEUR),
    icon: 'nb-e-commerce',
    link: '/pages/crm/affaire',
  }, {
    title: 'Prospecteurs',
    hidden: !Authorities.hasAutorities(adminsAuthorities.PROSPECTEUR),
    icon: 'nb-arrow-dropright',
    link: '/pages/crm/prospecteurs',
  }, {
    title: 'Plannings',
    hidden: !Authorities.hasAutorities(adminsAuthorities.PROSPECTEUR),
    icon: 'nb-search',
    link: '/pages/crm/planning',
  },

];