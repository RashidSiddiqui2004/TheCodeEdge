
import {
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, 
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
 

export function BreadCrumbComponent() {
    return (
        <Breadcrumb className="mx-6 mt-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className=" text-slate-200 hover:text-slate-300">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/editorials" className=" text-slate-200 hover:text-slate-300">Editorials</BreadcrumbLink>
                </BreadcrumbItem> 
            </BreadcrumbList>
        </Breadcrumb>
    )
}
