
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
                    <BreadcrumbLink href="/" className=" ">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/editorials" className="">Editorials</BreadcrumbLink>
                </BreadcrumbItem> 
            </BreadcrumbList>
        </Breadcrumb>
    )
}
