(function() {
  if (window.top === window.self) {
    const tabId = sessionStorage.tabId ? sessionStorage.tabId : sessionStorage.tabId = Math.random() * 16;
    console.log('Top level document: ' + window.location.href);

    const saReport = function () {
      const a = document.createElement('A');
      a.href = window.location.href;

      const xhr = new XMLHttpRequest();
      const body = {
        url: sessionStorage[tabId + '-href'],
        tabId: tabId
      };
      xhr.open('POST', document.location.origin + '/93791460bd4591916fae6788dd691570096e47a0e47061cdead407edc2363560/log', true);
      xhr.send(JSON.stringify(body));

    };

    const saTicker = function () {
      setTimeout(() => {
        if (parent.document.URL !== sessionStorage[tabId + '-href']) {
          sessionStorage[tabId + '-href'] = parent.document.URL;
          console.log('LS: Ticker: ' + sessionStorage[tabId + '-href'] + ', ' + window.location.href);
          saReport();
        }
        saTicker();
      }, 1000);
    };

    if (window.location.href.match(/(^|\.)youtube\./)) {
      const style = document.createElement('STYLE');
      const params = undefined;
      const flaggedTerms = undefined;
      let killYTAutoplayInt;
      let hideYTAvatarInt;
      const a = document.createElement('A');
      a.href = window.location.href;

      console.log('YouTube injection');

      const applyYouTube = function () {
        const xhr = new XMLHttpRequest();
        const body = {
          code: 'settings',
          url: window.location.href
        };
        xhr.open('POST', document.location.origin + '/93791460bd4591916fae6788dd691570096e47a0e47061cdead407edc2363560/ytconf', true);
        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = function () {
          if (this.status === 200 && xhr.responseText) {
            console.log('Applying YouTube settings...');
            const ytSettings = JSON.parse(xhr.responseText);
            console.log(JSON.stringify(ytSettings));
            if (ytSettings.score && ytSettings.score.blocked) {
              window.location.href = ytSettings.score.redirect;
            } else {
              configureYoutube(ytSettings);
            }
          }
        };
      };

      const configureYoutube = function (ytSettings) {
        if (typeof(ytSettings) === 'undefined') {
          return;
        }
      
        style.type = 'text/css';
        style.innerText = '';
        if (ytSettings.youtube_hide_sidebar) {
          style.innerText += '.watch-sidebar, .ytd-watch-next-secondary-results-renderer {display: none !important;}\n';
        }
        if (ytSettings.youtube_hide_comments) {
          style.innerText += '#watch-discussion, .watch-discussion, ytd-comments {display: none !important;}\n';
        }
        if (typeof(killYTAutoplayInt) !== 'undefined') {
          clearInterval(killYTAutoplayInt);
          killYTAutoplayInt = undefined;
        }
        if (ytSettings.youtube_prevent_channel_autoplay) {
          killYTAutoplayInt = setInterval(killYTAutoplay, 1000);
        }
        if (typeof(hideYTAvatarInt) !== 'undefined') {
          clearInterval(hideYTAvatarInt);
          hideYTAvatarInt = undefined;
        }

        if (ytSettings.youtube_hide_thumbnails) {
          hideYTAvatars();
          hideYTAvatarInt = setInterval(hideYTAvatars, 1000);
        }
        if (style.innerText !== '') {
          let head = document.getElementsByTagName('head');
          if (head && head.length > 0) {
            head = head[0];
            head.append(style);
          }
        }
      };

      const blockYTImg = '/93791460bd4591916fae6788dd691570096e47a0e47061cdead407edc2363560/blocked-yt-image.png';
      function hideYTAvatars() {
        const a = [...document.querySelectorAll('#avatar')];
        a.forEach((t) => {
          [...t.getElementsByTagName('img')].forEach((i) => {
            if (i.src !== blockYTImg) {
              i.src = blockYTImg;
            }
          });
        });
      };

      function killYTAutoplay () {
        let ul, playerById, players;
        // Make sure our anchor has the latest
        a.href = window.location.href;
        if (a.hostname.match(/(^|\.)youtube\./)) {
          if (
            a.pathname.match(/^\/user\/[^\/\?]+$/)
            ||
            a.pathname.match(/^\/channel\/[^\/\?]+$/)
            ||
            a.pathname.match(/\/featured$/)
          ) {
            ul = document.getElementById('browse-items-primary');
            playerById = document.getElementById('player-container');
            if (playerById !== null && typeof(playerById) !== 'undefined') {
              playerById.parentElement.style.visibility = 'hidden';
            }
            if (ul !== null && typeof(ul) !== 'undefined') {
              players = ul.getElementsByClassName('video-player-view-component');
              if (typeof(players[0]) !== 'undefined') {
                players[0].style.visibility = 'hidden';
              }
            }
            const html5player = document.getElementById('c4-player');
            if (html5player !== null && typeof(html5player) !== 'undefined') {
              const actualCode = '(' + function () {
                document.getElementById('c4-player').pauseVideo();
                ul = document.getElementById('browse-items-primary');
                playerById = document.getElementById('player-container');
                if (playerById !== null && typeof(playerById) !== 'undefined') {
                //playerById.parentElement.remove();
                }
                if (ul !== null && typeof(ul) !== 'undefined') {
                  players = ul.getElementsByClassName('video-player-view-component');
                  if (players[0] !== null && typeof(players[0]) !== 'undefined') {
                  //players[0].remove();
                  }
                }
              } + ')();';
              const script = document.createElement('script');
              script.textContent = actualCode;
              (document.head || document.documentElement).appendChild(script);
              script.remove();
            }
          }
        }
      };

      let path;
      function watchDog() {
        if (path !== window.location.href) {
          applyYouTube();
          path = window.location.href;
        }
        if (!style.parentElement) {
          let head = document.getElementsByTagName('head');
          if (head && head.length > 0) {
            head = head[0];
            head.append(style);
          }
        }
      }
      setInterval(watchDog, 1000);
      watchDog();
    };


    saTicker();
  }
}).call(this);
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const a = document.createElement('A');
a.href = window.location.href;
const FlagEngine = require('./in_page/in_page_flags');

const setupFlagScanning = function(terms, ignoredSites) {
  if (window.relay_log === 'debug') { console.debug('[setupFlagScanning]');}
  if (!Array.isArray(ignoredSites)) { ignoredSites = [];}
  if (terms && terms.length > 0) {
    if (window.relay_log === 'debug') { console.debug('[setupFlagScanning] terms found, starting scanning engine.'); }
    let scanInterval;
    const flagger = new FlagEngine(a);
    flagger.Initialize(terms, ignoredSites).then(() => {
      if (typeof(scanInterval) !== 'undefined') {
        clearInterval(scanInterval);
      }
      const scanAndReport = () => {
        if (window.relay_log === 'debug') { console.debug('[scanAndReport]'); }
        try {
          // Make sure we are up to date on our url
          if (window.location.href !== a.href) {
            if (window.relay_log === 'debug') { console.debug('[scanAndReport] location changed, treating as a new page'); }
            a.href = window.location.href;
          }
          const flags = flagger.Scan();
          if (Array.isArray(flags) && flags.length > 0) {
            if (window.relay_log === 'debug') { console.debug('[scanAndReport] flags found, reporting them: ', flags); }
            flagger.Report(flags);
          }
        } catch (e) {
          console.error(e);
        }
      };
      scanInterval = setInterval(scanAndReport, 5000);
      scanAndReport();
    }).catch(console.error);
  }
};
setupFlagScanning([], ["fcps.edu","adobess.com","search.google.com","office365.com","quantserve.com","wikimedia.org","bitmoji.com","ssl.translatoruser.net","xsplit.com","chariotsforhire.com","signcommand.com","cvshealth.com","adobecc.com","vimeo.com","gm1.ggpht.com","r4.res.office365.com","outlook.office365.com","googleapis.com","accounts.gstatic.com","fonts.gstatic.com","ssl.gstatic.com","googleusercontent.com","skype.com","safeshare.tv","clients1.google.com","hangouts.google.com","clients3.google.com","clients4.google.com","tinyurl.com","clients2.google.com","tarheelgameplay.org","clients5.google.com","wikipedia.org","clients6.google.com","tools.google.com","pack.google.com","googledocs.com","scmsptso.org","linxncr.us","jmhsptsa.org","accounts.youtube.com","csi.gstatic.com","childplus.com","fbcdn.net","fairfaxcounty.gov","frc5549.org","dropbox.com","webex.com","talk.google.com","uconnect.fcps.edu","humanetech.com","bankofamerica.com","t.co","sam.gov","childplus.net","tableau.com","viewpure.com","bbcollab.cloud","polka.typekit.com","microsoft.com","prioritytoyotaspringfield.com","windows.net","virginia.edu","orc.com","mpo.ec.ncsc.mil","s3-1-w.amazonaws.com","hp.com","sqs.us-west-2.amazonaws.com","pnc.com","programworkshop.com","adnxs.com","dell.com","prodigygame.com/play","usertrust.com","incommon-rsa.org","msftconnecttest.com","marriott.com","tenable.com","e2-as1.support-download.com","gao.gov","nessus.org","tenablesecurity.com","starttest.com","starttest2.com","startpractice.com","collegeboard.org","pearson.com","novahispanicchamber.com","ctnsnet.com","wida-ams.us","vimeocdn.com","wisc.edu","wida.us","bam.nr-data.net","virginia.gov","behance.net","stmath.com","fcpshr.wordpress.com","debbiediller.wordpress.com","ftcdn.net","schoology.com","schoologytest.com","learnosity.com","s3.amazonaws.com/learnositymediaprocessed","s3.amazonaws.com/assets.learnosity.com","kpkgpta.org","soundbodyandminds.com","verifyexpress.com","lieasyesol.blogspot.com","fatefacts.org","americanframe.com","haleitsblog.blogspot.com","leadershipfreak.blog","http://web.archive.org/web/20171225153329/http://www.learnnc.org","tobiidynavox-webgames.com","pblinfcps.blogspot.com","blog.adobespark.com","travelsteals.webs.com","seedfolks15.blogspot.com","shebelievesinme.org","vrespta.org","nvms.us","comprintdc.com","studio.youtube.com","symantec.com","fcpdnews.wordpress.com/","translator.microsoft.com/","http://microsofttranslator.com/","translate.google.com","images.google.com","pstatic.net","Plumesol.blogspot.com","vpe.cdn.vimeo.tv","vangoghmuseum-assetserver.appspot.com","https://www.zoho.com/","zoho.com/","join.zoho.com","getsitecontrol.com","newrelic.com","typekit.net","acquia.com","ally.ac","anydesk.com","https://f.hubspotusercontent30.net/hubfs/7083436/DataManager%20Proctor%20Playbook%20.pdf","*.bigmarker.com","tabletopia.com/playground/achi-7guxye/play-now","https://tabletopia.com/playground/achi-7guxye/play-now","https://tabletopia.com/playground/cannonball-foam-balls-cy5g1h/play-now","https://tabletopia.com/playground/fanorona-isxc1g/play-now","https://tabletopia.com/playground/gulugufe-iygaj5/play-now","https://tabletopia.com/playground/jiji-bingo-ndm3be/play-now","https://tabletopia.com/playground/kraal-cows-r3mj8v/play-now","https://tabletopia.com/playground/kraal-cows_ii-ujs6bc/play-now","https://tabletopia.com/playground/turtle-sums-wkthed/play-now","https://tabletopia.com/playground/turtle-sums-extended-play-b2gvxa/play-now","*cdn.tabletopia.com/js/*","*tabletopia.com/Content/*","*.testnav.com","*.pearsontestcontent.com","*.thawte.com","*.usertrust.com","*.comodoca.com","*us-east-2-content-hosting-form-locker-prod.s3.us-east-2.amazonaws.com","*us-east-1-content-hosting-form-locker-prod.s3.us-east-1.amazonaws.com","*cdn-download-prod.drcedirect.com","*cdn-content-prod.drcedirect.com","*api-gateway.drcedirect.com","*api-gateway-cloud.drcedirect.com","*dtk.drcedirect.com","*wbte.drcedirect.com","*wida-te.drcedirect.com","*wida.drcedirect.com","*wida-insight.drcedirect.com","*wida-insight-client.drcedirect.com","*east-2-drc-wbte-prod-wida.s3.amazonaws.com","*east-1-drc-wbte-prod-wida.s3.amazonaws.com","*drc-wbte-prod.s3.amazonaws.com","*drc-centraloffice.com","*.drcedirect.com","*.wida-ams.us","dailymoth.com","*.chime.aws","*.cowriter.dev","*.donjohnston.net","*.speechstream.net","*.pixellot.stream","labclient.labondemand.com","playvs.com","playvs.zendesk.com","www.google.fr","www.yearbookbesties.com","flickr.com","yearbookbesties.com","canva.com","viennasummerstrings.mystrikingly.com","netflix.com","anvsoft.com","hxc2.me","mailstorageaccess.yahoosites.com","www.f-zeroaerospace.com/PPDDF/index.php","www.centrolucas.es/PPDDF/index.php","www.theclassifiedshoppers.com/application-form.html","sites.google.com/site/tyronesgameshack","educationgrantapproval.com","*subgfyfs*","*unblockurgames*","*unblockedgame*","fcpsexposed.com","answeraddicts.com","bluefisheducation.com","*unblockedgamesforpeasants*","azquotes.com","getjoin.me","support-center.top","https://support-center.top","https://sites.google.com/view/offshore6583owa/home","sites.google.com/site/unblockedgameswtf/","sites.google.com/site/unblockedgameswtf","*sites.google.com/site/unblockedgameswtf*","*/site/unblockedgameswtf*","*sites.google.com/site/unblockedgameswtf/*","*sites.google.com/site/thegamecompilation*","umslhc.com","*unblocked-games.*","*unblocked-games*","*/site/unblock12341010/*","*unblocked-games.s3*","*/site/tyronesgameshack*","*/site/tyronesgamesez/*","*unblocked-games.s3.*","https://unblocked-games.s3.amazonaws.com/index.html","*site/slopeunblockednow/*","sites.google.com/site/unblockedgamingforyo","*minecraftunblockedforschool.weebly.com/*","*sites.google.com/site/minecraft152unblockedshadow/*","*/site/unblockedgamingforyo/*","*lichgames.s3*","*lichgames*","*lichgames.s3.amazonaws.com/*","unblocked-games.s3.amazonaws.com","unblocked-games.s3.amazonaws.com/forcez-io.html","unblocked-games.s3.amazonaws.com/index.html","*fcpsbigbrain*","crazygames.com","worldstarhiphop.com","salwyrr.com","*miniproxy.php*","Onetouchtv.me","sites.google.com/site/xenogame224","*xenogame224/","*site/xenogame224/","*fbx?fbx=snake_arcade","*/cookieclicker/","my-craft.org","mathdrills.info","*/site/xenogame224/*","*xenogames224*","*gogoanime*","*.gogoanime*","*gogoanime.*","*.gogoanime.*","*p29t3.sse.*","*/site/thegameswereallywant/*","filehorse.com","digitaltrends.com","panamafasr101.weebly.com","*shsgames.*","*site/funblocked66/*","*/gamesbyblarkin*","*/misc-js-benchmarks/banana/*","*/view/theadvancedmethod*","*trixter9994.github.io/*","*.org/sketch/453716/*","*.com/en-us/p/snakes-and-apples/*","*/snakes-and-apples/*","*ubg100.g*","*view/schoolrxgames/*","*.com/0ubz-2q11-gi9y/*","*/site/playunblocked66/unfair-mario*","*site/playunblocked66/unfair-mario*","*site/lmsunblockedsite/home/download-minecraft-1-8-9*","*gamesrus.herokuapp.com/*","*.com/xman213?tab=repositories*","*.com/IanKavaYT*","*xman213.g*","*kinza.jp/en/download/*","*waterfox.net/download/*","*s2dfree.*","*soap2day.*","*softpedia.com/get/*","*softonic.com*","*download.zone*","http://kxgv11.xyz/IfYwsr4Eli","*avantage-doc*","*10exits-exoduss*","*colliab*","*cryptogames-fund*","*eth22*","*ether-2022*","*ether-rich*","*local-exchanger*","*metamask*","nft-store.store","*nfttop*","polkagive.com","*shiba22*","*webb-exodus*","*avantage-doc.ru/wp-snapshots/ldVENN/","*txingame.com/wp-content/PwKfVQfdhHbAv2j","*wordpressdes.vanzolini-gte.org.br/fundacaotelefonica.org.br/gAbC4QpJYI/","*shopnhap.com/highbinder/nnYko9FDNJ/","*bloompeople.com/wp-admin/62Vm3tfTVucq5Ww7/","*jnicoledunn.com/b/fApcc3yf/","*wordpressdes.vanzolini-gte*","trinitysthingss.com","*node-unblocker-22.herokuapp.com*","*prestigegames777.weebly.com*","*download-chromium.appspot.com*","*techspot.com/downloads/4936-chromium.html*","*chromium-browser-64bit.en.lo4d.com/windows*","*github.com/glixzzy/blooket-hack*","*unblockedhub.github.io*","*s3.amazonaws.com/crazygames-unblocked/*","*sites.google.com/view/gamehubcool/*","*tkashkin.github.io/projects/gamehub/*","*confirmsubscription.com*","*github.com/chromium/chromium*","*github.com/chromium/*","*.2software.net/download-ravenfield-a-fastpaced-tactical-first-person-shooter-*","*sites.google.com/view/sealcentral/games/mobile-gxmes/*","*docs.google.com/file/d/0B31yDisaVYy6RUlBNGJMQ1B2WlU/edit?resourcekey=0-fxOcXe2guoFC2bwyxrmAAA*","*sites.google.com/fcpsschools.net/ghostgames/*","*portapps.io/app/discord*","*sites.google.com/site/playncade/games*","*/site/playunblocked66/*","*int3.github.io/open-syobon-action.js/*","*portapps.io/download/discord-portable-win32-1.0.9002-9-setup*","*drive.google.com/file/d/1DV16F8nK1cy7ZoKkSufpFwppOKCNxQJq/view*","*drive.google.com/file/d/1YyLDouVFpTd5q3KCn5LTBOXWvTPNHNt9/view*","*drive.google.com/file/d/1x9Y_UP334fLikE2VK9Ln0_nE5QBUruz9/view*","*drive.google.com/file/d/14XOCJqMMd8dX6QXnRCuhdMO-0_8i4M5z/view*","*docs.google.com/presentation/d/1vg2eS5SxSFrXbXgD0POKn7oSJC6Mjy3QVo9XPQwEPZ0/edit*","https://docs.google.com/forms/d/e/1FAIpQLSeyeJmFP7l62EUxfZjtNNSUWjQkn7BHJE7CR3AeWFlhL85T2w/viewform","*womginx.terminal10.repl.co*","*unblocked1889.github.io/Retr0b0wl/*","*sites.google.com/view/glizzy777/*","*holy-unblocker--henry_the_man.repl.co*","*github.com/xman213/minecraftatschool*","*securecloud-smart.com/?a=8286&c=174995&s2=eorsd617ec1190*","*.com/u/0/uc?id=0B-xENJ-pMOUGbWxFROFsZWVmY2c&export=download*","*login.lnternationalsos.com*","*gcarlpurcell.com*","*sites.google.com/view/2playergameunblocked/*","*pramuwaskito.org/game/*","*node-unblocker789.herokuapp.com*","*sites.google.com/fcpsschools.net/bestbraingames/*","*.apiste-jp.com","*.cotransa.ga","*eeegames.vercel.app*","*chrome.google.com/webstore/detail/workingvpn-a-free-vpn-tha/*","*unblocked-gba.netlify.app/*","*000685931.deployed.codepen.website/*","*topwargame.com/h5game/*","*rotation.ahrealestatepr.com*","yandexadexchange.net","*.yandex.ru","r.mail.ru","px-eu.adhigh.net","*.adhigh.net","smtp11.sender.ltmse.com","dm-us.hybrid.ai","betweendigital.cdnvideo.ru","*abb2e7cf.sibforms.com*","*sites.google.com/view/gamehubsus/*","*sibforms.com*","*finalexpense.services*","*amazing-lovelace-d9f7a1.netlify.app/*","*bobsgameshack.rf.gd*","*district-advisor.com*","*sites.google.com/apps.wylieisd.net/acwiki/*","*sites.google.com/view/unblokedshack*","*sites.google.com/view/html5gamesunblocked/*","*us.albertshark.repl.co/*","*sites.google.com/view/iogames8","*slopeunblock.github.io/*","*patreon.com/join/croxyproxy*","*borderpolar.com/fnaf-games-five-nights-at-freddys*","*v6p9d9t4.ssl.hwcdn.net/html/863416/FNAF1WebGL/index.html*","*mhasibusacco.com/JPMorgan*","*unusualloginattempt.blob.core.windows.net*","*mhasibusacco.com*","*codepen.io/inventionstuff/project/live/*","*000685931.codepen.website*","*moyaimoment.github.io/games/*","*oos.moxiecode.com/js_webgl/xwing/*","*vole.wtf/perfect-circle/*","*docs.google.com/presentation/d/1vKihhG4c2JiM-u_LVOav15q0zY9e9FM4CkKwon8g6C4/*","*ncase.me/anxiety/*","*dev-gamesfordays.pantheonsite.io*","*lekug.github.io/*","*moyaimoment.github.io/*","*bd0d99eb-6531-46c9-9032-961a7d3d1ccb.id.repl.co/web/_aHR0cHM6Ly9zaGVsbHNob2NrLmlv_/#28w6fhimak*","*sites.google.com/view/imadethislol/all-games*","*grandcanyonshuttles.com/uploads/5/5/6/7/5567194/custom_themes/763966870438452844/*","*codepen.io/jcoulterdesign/pen/*","*github.com/tkashkin/GameHub*","*drive.google.com/file/d/1MEOQSl4kGxCj8UxaII6AYio_TtxPcBdq/*","*drive.google.com/file/d/0B1K_QYi1iipGVlRIZ1R5ak9yWmM/*","*drive.google.com/open?id=1pe5MM2AgC9q_Mrw1TQ21rsCp0hR3ya1w*","*drive.google.com/file/d/13p-Brsps49bGsrYYy5RJgkNaGv3HQA0h/*","*drive.google.com/file/d/0B9-KdM_LvVB0SmtXSHM0azBGNm8/*","*drive.google.com/file/d/1mnzn9bJviENkRoNkibOIM5QQNG_RC6Ej/view*","*drive.google.com/file/d/0B5-masjLqpYSbUNsS1hhSGhtNTQ/*","*drive.google.com/file/d/1h35tklImCvE4gkQcpvqR8Yby-AGaeUJu/view*","*drive.google.com/file/d/0B-xENJ-pMOUGbWxFR0FsZWVmY2c/*","*drive.google.com/file/d/1ZwVx0EeXtjtemiCLlmSwbh8PV3ycVFwm/*","*drive.google.com/file/d/1PaFipQ6oPnlt7DHDKaVs16UVw4btkbfT/*","*drive.google.com/file/d/12BCjcGgjRO0u2UMHorO6FAiqfFd7VtUj/*","*drive.google.com/file/d/1KsZ1nghLQTYcRd4hL_vcGvTA_bqRuOje/*","*drive.google.com/file/d/1Xi2tFR1d8rSNwBm1fI3yHlQ6EP_dWXs7/*","*drive.google.com/file/d/12Ahp4w2qrAt8MHosS1Biu5pjlo7kUI8y/*","*drive.google.com/file/d/10NZNyTOrwQGTAJPWZDDZqXz9NvmqNAhw/*","*drive.google.com/file/d/1rcWfPFYIdMVVekOD67yMgIWFJbdKelpq/*","*drive.google.com/file/d/1g_Z5o9_pC1qXpmS50b9CHjn6jQ4Lpdyi/*","*drive.google.com/file/d/1Oj7tieOCStQaRdOoCcxiAtXWSDnoHoFB/*","*drive.google.com/file/d/1q7s5FX_NDutMR8Z3V-Utm8u-9zl8xKdY/*","*drive.google.com/file/d/1k36MYE5bpDgZ-_Fc3sUnAH6abZozghlS/*","*drive.google.com/file/d/1nevFBopUANcnrJNYAW9K4pTK_0nO-Quw/*","*drive.google.com/file/d/1fcpAbnyQGIm-s6E89xI9kqyzxER6PIbc/*","*drive.google.com/file/d/1FST-_TDlP7K5JjOb5OVmXKvnWG-iZFzP/*","*drive.google.com/file/d/1tMR1UY0cEbQo4B0oy5brxGhzwkcd7spR/*","*drive.google.com/file/d/1R2rFZafVQLP17bdkV2dQHjq54kjPF0ys/*","*drive.google.com/file/d/1w5Pu3pvCvnnmeTUEWj4ZDlIpmey4rIlp/*","*drive.google.com/file/d/1WqKiCtacvl52mbj_wNz9f6i29_pq5lZM/*","*drive.google.com/file/d/1-YQJINKB4ZNPdc7aAdSz2W5ClliMBHCo/*","*drive.google.com/file/d/1vvCD5HbYU-KjTC6LtK0ejjvaecw6JURj/*","*drive.google.com/file/d/1DQnmYW_2UmqsaUZ5NJcyhpq6z52iX4gI/*","*drive.google.com/file/d/16lbtAiwrQF8aGso6neh7c0Jjtk_qK2JQ/*","*drive.google.com/file/d/1vGpB-Rg5O6aFNVDhgE_DtsIFqCqp-yOp/*","*drive.google.com/file/d/1O41dt-MuLDWq5YaT6UWcNStZh2bwRR60/*","*chvin.github.io/react-tetris/*","*sites.google.com/site/unblokedgamesshack/*","*sites.google.com/site/unblockedgamessms6969/*","*onedrive.live.com/download?cid=973140F4C17F301F&resid=973140F4C17F301F%21134&authkey=ALotEWTde7d8HKM*","*r4uujq.am.files.1drv.com/y4mLSAKHJZg51x6s_mf7c4A7lzhhAfyCw2J1XffR5yDycERpJMKGAzGXCurQBrgI19KhmDX_okKubROTalYarirmlool00WRIEFSxOCnqVxbanTitQ6gXV7bgAgSpccCWDF9TuyOm88SEndbu-fiHvfwFROsQwyCKlkrQG0JZYADmD8-yo03FDHgQH7fdcJBbobo_hZffhe3_ktvvQ2_g14Wg/Iksnmokkktlwlmfahjqnufasuoqwmxh?download&psid=1*","*sites.google.com/site/fitreckgames3/home/super-fighters*","*sites.google.com/site/thegaminghomepage/g/superfighters*","*onedrive.live.com/download?cid=79EA009B5BD27E2A&resid=79EA009B5BD27E2A!105&authkey=AFqX5zB-8EnMBxk*","*aoc7eg.bn.files.1drv.com/y4mRSTTiQtgZSAhEUsGlrX6oYBdQJ8wxJYMxdgZCTjuczohj3EpCGDrKb4gdeT3b3did0ESCs36dVk5wWZOUTBI4Lp09gHgHauKAyjLf0QWETnK1sN3ciq5z26Sx_b9FWDFUxVBF3T18C_u0nsch-0vJH67YSLqxjUuZLnxXENfwQ3pmMZqTbcH33lGC2M-cpBmFu0pcRQM-E2mS15Ea9MPXg/Cheque_no_Erro_details_456240_docx.rar?download&psid=1*","*drive.google.com/file/d/1i30eESrN0jUAJ1_WZbfIFhL0ZCWngu7X/view?usp=drive_web*","*drive.google.com/file/d/1elFOTgzm5XV_fP3umAXILvwsjXcbDt38/view?usp=drive_web*","*sites.google.com/view/iogames*","*taozhiyu.gitee.io/fake/win7/win7.html*","*sites.google.com/view/vitalityofficial/web-games*","*holy*unblocker*","*macro-blue.cam/Webmail/1/webmail.php?email=$email*","*katchelo.github.io/blockpost/*","*tunnelrush.github.io/*","*dik.si/WFVWZ*","*u5671903.ct.sendgrid.net/ls/*","*chrome.google.com/webstore/detail/croxyproxy-free-web-proxy/*","*drive.google.com/file/d/1WIiO39p q_x- EjTZ8neetm7Jua6gCH_nP/view?usp=driv e_web*","*drive.google.com/file/d/1yFwp8T eNBtO58fxKPIENNBC6XUlO59-- /view?usp=drive_web*","*drive.google.com/file/d/1nYIohXJ svsX6N53ZaV0Zlekp7M7cKMW9/view?us p=drive_web*","*00687208.codepen.website/*","*cdpn.io/pen/debug/qBpQaKG*","*debbiewatermanphd.com/uploads/3/4/3/4/139890129/custom_themes/943031582154601096/files/*","*sites.google.com/view/mathlabs/*","*codepen.io/inventionstuff/full/eYyvvLz*","*mediafire.com/file/nv3lv0ab9n5jer3/bgs-v2.html/*","*sites.google.com/view/flashgameunblocked*","*sites.google.com/view/ugmes1/*","*twitter.com/malwrhunterteam/*","*trinculo54.github.io/Games-hub/*","*gamearians.github.io/games/*","*sites.google.com/view/game-hub-2/game-hub*","*tr2games.weebly.com*","localhost"]);

},{"./in_page/in_page_flags":5}],2:[function(require,module,exports){
class FacebookFlags {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') { throw new Error('URL OBject required');}
    this.disabled = true;
    this.moduleName = 'facebook';
    if (urlObject.hostname.match(/\.?facebook\.com$/i)) {
      this.disabled = false;
    }
  }

  GatherIntent() {
    if (this.disabled) { return;}
    const ret = [];
    const elements = document.querySelectorAll('[data-text="true"]');
    elements.forEach((e) => {
      ret.push(e.innerText);
    });
    return ret;
  }
}

module.exports = FacebookFlags;

},{}],3:[function(require,module,exports){
class GmailFlags {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') { throw new Error('URL OBject required');}
    this.disabled = true;
    this.moduleName = 'gmail';
    if (urlObject.hostname.match(/mail\.google\.com$/i)) {
      this.disabled = false;
    }
  }

  GatherIntent() {
    if (this.disabled) { return;}
    const ret = [];
    const elements = document.querySelectorAll('[role="textbox"]');
    elements.forEach((e) => {
      ret.push(e.innerText);
    });
    return ret;
  }
}

module.exports = GmailFlags;

},{}],4:[function(require,module,exports){
class GoogleDoc {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') { throw new Error('URL OBject required');}
    this.disabled = true;
    this.moduleName = 'google_doc';
    if (urlObject.hostname.match(/docs\.google\.com$/i)) {
      this.disabled = false;
    }
  }

  GatherIntent() {
    if (this.disabled) { return;}
    const ret = [document.body.innerText];
    return ret;
  }
}

module.exports = GoogleDoc;

},{}],5:[function(require,module,exports){
const supportedDOMEvents = ['change', 'keyup'];
const FB = require('./facebook_flags');
const Twitter = require('./twitter_flags');
const Gmail = require('./gmail_flags');
const GoogleDoc = require('./google_doc_flags');
const MSOffice = require('./ms_office_flags');
class Flags {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') {
      throw new Error('url object required');
    }
    this.UrlObject = urlObject;
    this.terms = [];
    this.lastBodyText = '';
    this.target = {};
    this.initialized = false;
    this.reportedTerms = {};
    this.modules = [];
    const fbModule = new FB(urlObject);
    if (!fbModule.disabled) {
      this.modules.push(fbModule);
    }
    const twitterModule = new Twitter(urlObject);
    if (!twitterModule.disabled) {
      this.modules.push(twitterModule);
    }
    const gmailModule = new Gmail(urlObject);
    if (!gmailModule.disabled) {
      this.modules.push(gmailModule);
    }
    const googleDocModule = new GoogleDoc(urlObject);
    if (!googleDocModule.disabled) {
      this.modules.push(googleDocModule);
    }
    const msOfficeModule = new MSOffice(urlObject);
    if (!msOfficeModule.disabled) {
      this.modules.push(msOfficeModule);
    }
  }

  DOMExtractAndScan(event) {
    if (typeof(event.target) === 'undefined') { throw new Error('event has no target');}
    let values;
    let scanType;
    switch (event.type) {
    case 'scan':
      scanType = 'GatherIntent';
      break;
    default:
      scanType = event.target.tagName.toLowerCase();
      break;
    }

    switch (scanType) {
    case 'input':
      let type = event.target.type || 'text';
      type = type.toLowerCase();
      // Dont scan password fields
      if (type === 'password') { break;}
      values = [event.target.value];
      break;
    case 'textarea':
      values = [event.target.value];
      break;
    default:
      values = [];
      this.modules.forEach((module) => {
        if (typeof(module.GatherIntent) === 'function') {
          const intent = module.GatherIntent();
          if (typeof(intent) === 'string') {
            values.push(intent);
          } else if (Array.isArray(intent)) {
            values = values.concat(intent);
          }
        }
      });
      break;
    }
    if (typeof(values) !== 'undefined') {
      values.forEach((value) => {
        if (value === '') {
          this.target.RelayFlaggedTerms = {};
        } else {
          if (typeof(this.target.RelayFlaggedTerms) === 'undefined') {
            this.target.RelayFlaggedTerms = {};
          }
          const flags = this.Scan(value);
          const toReport = [];
          flags.forEach((flag) => {
            const term = flag[0];
            const cnt = flag[1];
            flag[2] = true; // mark it as user entered
            if (typeof(this.target.RelayFlaggedTerms[term]) === 'undefined') {
              this.target.RelayFlaggedTerms[term] = cnt;
              toReport.push(flag);
            } else {
              if (this.target.RelayFlaggedTerms[term] < cnt) {
                // Only report the new difference
                flag[1] = cnt - this.target.RelayFlaggedTerms[term];
                this.target.RelayFlaggedTerms[term] += flag[1];
                toReport.push(flag);
              }
            }
          });
          if (toReport.length > 0) {
            this.Report(toReport);
          }
        }
      });
    }
  }

  HandleDOM_change(event) {
    if (typeof(event) === 'undefined') { throw new Error('event required');}
    if (event.type !== 'change') { throw new Error('event must be a change event');}
    if (typeof(event.target) === 'undefined') { throw new Error('event has no target');}
    if (typeof(event.target.tagName) === 'undefined') { return;}
    if (this.ShouldIgnore()) { return;}
    this.DOMExtractAndScan(event);
  }

  HandleDOM_keyup(event) {
    if (typeof(event) === 'undefined') { throw new Error('event required');}
    if (event.type !== 'keyup') { throw new Error('event must be a keyup event');}
    if (typeof(event.target) === 'undefined') { throw new Error('event has no target');}
    if (typeof(event.target.tagName) === 'undefined') { return;}
    if (this.ShouldIgnore()) { return;}
    this.DOMExtractAndScan(event);
  }

  HandleDOM(event) {
    if (typeof(event) === 'undefined') { throw new Error('event required');}
    if (supportedDOMEvents.indexOf(event.type) === -1) {
      throw new Error(`unsupported event type - ${event.type}`);
    }
    if (typeof(this[`HandleDOM_${event.type}`]) === 'function') {
      this[`HandleDOM_${event.type}`](event);
    }
  };

  BindToDOM() {
    document.addEventListener('change', this.HandleDOM.bind(this));
    document.addEventListener('keyup', this.HandleDOM.bind(this));
    setInterval(() => {
      this.DOMExtractAndScan(new Event('scan'));
    }, 1000);
  }

  Initialize(terms, ignoredSites) {
    if (!Array.isArray(terms)) { throw new Error('terms required');}
    if (!Array.isArray(ignoredSites)) { throw new Error('ignoredSites required');}
    return new Promise((resolve, reject) => {
      this.terms = [];
      terms.forEach((term) => {
        const args = {term: term};
        let regexTerm = term.replace(/[\]{}?^$().*\\+|[]/g, '\\$&');
        regexTerm = regexTerm.replace(/\\\*/g, '.*');
        regexTerm = regexTerm.replace(/\\\?/g, '.');
        args.regex = new RegExp('\\b' + regexTerm + '\\b','gi');
        this.terms.push(args);
      });
      this.ignoredSites = ignoredSites;
      this.initialized = true;
      this.BindToDOM();
      resolve();
    });
  }

  SiteMatchers() {
    if (typeof(this.siteMatchers) !== 'undefined') { return this.siteMatchers;}
    if (!Boolean(this.initialized)) { throw new Error('Initialization required');}
    try {
      this.siteMatchers = [];
      this.ignoredSites.forEach((site) => {
        if (typeof(site) === 'object') {
          if (Boolean(site.r)) {
            this.siteMatchers.push(
              new RegExp(site.url, 'i')
            );
          }
        } else if (typeof(site) === 'string') {
          if (site.match(/^([\w\d-]{1,63}\.)+[\w\d-]{1,63}$/i)) {
            this.siteMatchers.push(site.toLowerCase().split('.'));
          } else {
            let escapedUrl = site.replace(/[\]{}?^$().*\\+|[]/g, '\\$&');
            escapedUrl = escapedUrl.replace(/\\\*/g, '.*');
            this.siteMatchers.push(new RegExp('^' + escapedUrl + '$', 'i'));
          }
        }
      });
    } catch (e) {
      this.siteMatchers = undefined;
      throw e;
    }
    return this.siteMatchers;
  }

  ShouldIgnore() {
    if (!Boolean(this.initialized)) { throw new Error('Initialization required');}
    let ignore = false;
    const parts = this.UrlObject.hostname.toLowerCase().split('.');
    this.SiteMatchers().some((site) => {
      if (Object.prototype.toString.call(site) === '[object Array]') {
        const al = site.length;
        const pl = site.length;
        if (al <= pl) {
          for (let i=0; i<al; i++) {
            if (site[(al-1)-i] !== parts[(pl-1)-i]) {
              return false;
            }
          }
          ignore = true;
          return true;
        }
      } else if (this.UrlObject.href.match(site)) {
        ignore = true;
        return true;
      }
    });
    return ignore;
  }

  Scan(input) {
    const flags = [];
    let currentText = '';
    let customInput = false;
    if (!Boolean(this.initialized)) { throw new Error('Initialization required');}
    if (typeof(input) !== 'undefined' && typeof(input) !== 'string') { throw new Error('string required');}
    if (this.ShouldIgnore()) { return flags;}
    if (typeof(this.reportedTerms[this.UrlObject.href]) === 'undefined') {
      this.reportedTerms[this.UrlObject.href] = {};
    }
    if (typeof(input) === 'undefined') {
      currentText = document.body.innerText;
      // Already scaned this.
      if (currentText === this.lastBodyText) {
        return;
      }
    } else {
      currentText = input;
      customInput = true;
    }

    this.terms.forEach((args) => {
      const hits = currentText.match(args.regex);
      if (hits !== null && typeof(hits) !== 'undefined' && hits.length > 0) {
        if (typeof(this.reportedTerms[this.UrlObject.href][args.term]) === 'undefined') {
          flags.push([args.term, hits.length]);
          this.reportedTerms[this.UrlObject.href][args.term] = hits.length;
        } else if (customInput) {
          flags.push([args.term, hits.length]);
        }
      }
    });
    return flags;
  }

  Report(flags) {
    if (window.relay_log === 'debug') { console.debug('[Flagger.Report]'); }
    if (!Array.isArray(flags)) { throw new Error('flags must be an array');}
    if (flags.length === 0) { return;}
    const xhr = new XMLHttpRequest();
    xhr.open('POST', document.location.origin + '/93791460bd4591916fae6788dd691570096e47a0e47061cdead407edc2363560/log_flag', true);
    if (window.relay_log === 'debug') { console.debug('[Flagger.Report] - sending xhr'); }
    xhr.send(JSON.stringify({
      flags: {
        href: this.UrlObject.href,
        hits: flags
      }
    }));
  }
};
module.exports = Flags;

},{"./facebook_flags":2,"./gmail_flags":3,"./google_doc_flags":4,"./ms_office_flags":6,"./twitter_flags":7}],6:[function(require,module,exports){
class MSOffice {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') { throw new Error('URL OBject required');}
    this.disabled = true;
    this.moduleName = 'ms_office';
    this.hostname = urlObject.hostname.toLowerCase();
    this.disabled = this.setDisabled();
  }

  GatherIntent() {
    if (this.disabled) { return;}
    const ret = [document.body.innerText];
    return ret;
  }

  setDisabled() {
    const hostParts = this.hostname.split('.');
    const len = hostParts.length;
    if (!hostParts[len - 2]) { return true;}
    let domainName = hostParts[len - 2];
    let subDomainName = hostParts[len - 3];
    if (domainName === 'co' && hostParts[len - 1] === 'uk') {
      domainName = hostParts[len - 3];
      subDomainName = hostParts[len-4];
    }

    switch (domainName) {
      case 'live':
      case 'office':
      case 'office365':
        break;
      default:
        return true;
    }
    switch (subDomainName) {
      case 'officeapps':
      case 'outlook':
        return false;
      default:
        return true;
    }
  }
}

module.exports = MSOffice;

},{}],7:[function(require,module,exports){
class Twitter {
  constructor(urlObject) {
    if (typeof(urlObject) === 'undefined') { throw new Error('URL OBject required');}
    this.disabled = true;
    this.moduleName = 'twitter';
    if (urlObject.hostname.match(/\.?twitter\.com$/i)) {
      this.disabled = false;
    }
  }

  GatherIntent() {
    if (this.disabled) { return;}
    const ret = [];
    const elements = document.querySelectorAll('.tweet-box.rich-editor');
    elements.forEach((e) => {
      ret.push(e.innerText);
    });
    return ret;
  }
}

module.exports = Twitter;

},{}]},{},[1]);
