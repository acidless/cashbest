export type SberCashbackCategory = {
    title: string;
}

export type SberCashbackResponse = {
    body: {
        output: {
            myPrivilegesResponse: {
                currentPrivilege: {
                    privilegesList: SberCashbackCategory[]
                }
            }
        }
    }
}