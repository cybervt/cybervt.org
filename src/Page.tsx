export default interface PageProps
{
    isDesktop?: boolean
};

export default interface Page
{
    title: string,
    component: (props: PageProps) => JSX.Element,
    showTitle: boolean,
}