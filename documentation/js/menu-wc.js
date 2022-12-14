'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-boilerplate documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' : 'data-target="#xs-controllers-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' :
                                            'id="xs-controllers-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' : 'data-target="#xs-injectables-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' :
                                        'id="xs-injectables-links-module-AuthModule-a27cbc6ce15977916948d9801d14d82efb6efd8553ac2db0c9f3c34ce8eae7b6cbf7898f81560c9e56665314a9b49c08387bfd7893f33eb6f41f8a49cd2c58c2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurationModule.html" data-type="entity-link" >ConfigurationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-437f0e5be098ee9d3c7761f325929b74b6765766cda456e8ef5d68979813d99ed5141ed3006ff9b146240efb0bae5ce9015dc733988bbcfb334a11da8dcddfa2"' : 'data-target="#xs-injectables-links-module-RoleModule-437f0e5be098ee9d3c7761f325929b74b6765766cda456e8ef5d68979813d99ed5141ed3006ff9b146240efb0bae5ce9015dc733988bbcfb334a11da8dcddfa2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-437f0e5be098ee9d3c7761f325929b74b6765766cda456e8ef5d68979813d99ed5141ed3006ff9b146240efb0bae5ce9015dc733988bbcfb334a11da8dcddfa2"' :
                                        'id="xs-injectables-links-module-RoleModule-437f0e5be098ee9d3c7761f325929b74b6765766cda456e8ef5d68979813d99ed5141ed3006ff9b146240efb0bae5ce9015dc733988bbcfb334a11da8dcddfa2"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestModule.html" data-type="entity-link" >TestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' : 'data-target="#xs-controllers-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' :
                                            'id="xs-controllers-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' }>
                                            <li class="link">
                                                <a href="controllers/TestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' : 'data-target="#xs-injectables-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' :
                                        'id="xs-injectables-links-module-TestModule-102c42477b683adb1dc004a7bf0288a910082ddc08db52bd15e5b8c5de8bb7fbcddd3e70037480b2e1e0bd5638c47078dfe6df15087865d34cb1fc4dc38110fc"' }>
                                        <li class="link">
                                            <a href="injectables/TestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TotpModule.html" data-type="entity-link" >TotpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' : 'data-target="#xs-controllers-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' :
                                            'id="xs-controllers-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' : 'data-target="#xs-injectables-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' :
                                        'id="xs-injectables-links-module-UserModule-c040ef1185a92bb44a4daccb746bb6ed642a8521f545b5b16d5a85c89762e7e80e56bdf10ac8962fb0713cc55070ff85d8e62e3f98c74f51e8d30ea02fa66db3"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoleGroup.html" data-type="entity-link" >RoleGroup</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CoreEntity.html" data-type="entity-link" >CoreEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JWT1669729219582.html" data-type="entity-link" >JWT1669729219582</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoggerService.html" data-type="entity-link" >LoggerService</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role1670203037069.html" data-type="entity-link" >Role1670203037069</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveRoleDto.html" data-type="entity-link" >SaveRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveRoleGroupDto.html" data-type="entity-link" >SaveRoleGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorLoginDto.html" data-type="entity-link" >TwoFactorLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtMiddleware.html" data-type="entity-link" >JwtMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TotpService.html" data-type="entity-link" >TotpService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TwoFactorAuthGuard.html" data-type="entity-link" >TwoFactorAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtAuthPayload.html" data-type="entity-link" >JwtAuthPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TotpModuleOptions.html" data-type="entity-link" >TotpModuleOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});