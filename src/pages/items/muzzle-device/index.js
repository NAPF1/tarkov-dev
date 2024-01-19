import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '@mdi/react';
import {mdiBottleWine} from '@mdi/js';

import SEO from '../../../components/SEO';
import { Filter, ToggleFilter, SelectItemFilter } from '../../../components/filter';
import SmallItemTable from '../../../components/small-item-table';

import useItemsData from '../../../features/items';

function MuzzleDevices() {
    const [showAllItemSources, setShowAllItemSources] = useState(false);
    const [selectedGun, setSelectedGun] = useState(false);
    const { data: items } = useItemsData();

    const { t } = useTranslation();

    const activeGuns = useMemo(() => {
        return items.filter(item => item.types.includes('gun')).sort((a, b) => a.name.localeCompare(b.name)).map(item => {
            let iconLink = item.iconLink;
            if (item.properties?.defaultPreset) {
                const preset = items.find(i => i.id === item.properties.defaultPreset.id);
                if (preset) {
                    iconLink = preset.iconLink;
                }
            }
            return {
                ...item,
                iconLink,
            };
        });
    }, [items]);

    return [
        <SEO 
            title={`${t('Muzzle Devices')} - ${t('Escape from Tarkov')} - ${t('Tarkov.dev')}`}
            description={t('muzzle-devices-page-description', 'This page includes a sortable table with information on the different types of muzzle devices and accompanying attachments available in the game, including their ergonomics, recoil, and cheapest price.')}
            key="seo-wrapper"
        />,
        <div className="display-wrapper" key={'display-wrapper'}>
            <div className="page-headline-wrapper">
                <h1>
                    {t('Escape from Tarkov')}
                    <Icon path={mdiBottleWine} size={1.5} className="icon-with-text" /> 
                    {t('Muzzle Devices')}
                </h1>
                <Filter center>
                    <ToggleFilter
                        checked={showAllItemSources}
                        label={t('Ignore settings')}
                        onChange={(e) =>
                            setShowAllItemSources(!showAllItemSources)
                        }
                        tooltipContent={
                            <>
                                {t('Shows all sources of items regardless of your settings')}
                            </>
                        }
                    />
                    <SelectItemFilter
                        label={t('Filter by gun')}
                        placeholder={t('select a gun')}
                        items={activeGuns}
                        onChange={(event) => {
                            if (!event) {
                                return true;
                            }

                            if (!event.value) {
                                setSelectedGun(undefined);
                            }

                            setSelectedGun(
                                activeGuns.find(
                                    (activeGun) => activeGun.id === event.value,
                                ),
                            );
                        }}
                        wide
                    />
                </Filter>
            </div>

            <SmallItemTable
            // WHAT IS API CALL FOR FILTER OF MUZZLE DEVICES
                typeFilter="mods"
                nameFilter="muzzle"
                showAllSources={showAllItemSources}
                attachesToItemFilter={selectedGun}
                showAttachTo
                ergonomics={1}
                recoilModifier={2}
                cheapestPrice={3}
            />

            <div className="page-wrapper items-page-wrapper">
                <p>
                    {"In Escape from Tarkov, a muzzle device (a functional mod) can be installed on a weapon to reduce recoil, improve ergonomics, or attach a suppressor to muffle a gunshot sound."}
                </p>
                <p>
                    {"On this page you can see and sort muzzle devices (all or per weapon) by ergonomics penalty, recoil improvement, or their cost; in addition to the total penalties/improvements of the accopmanying attachments."}
                </p>
            </div>
        </div>,
    ];
}

export default MuzzleDevices;