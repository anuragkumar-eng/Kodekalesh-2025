/*
This module creates a new coin called "WELL" (Wellness Token)
It uses the standard 0x1::coin module.
*/
module AuraChainContracts::well_token {

    use std::signer;
    // **FIX 1 (Warning):** We remove the unused 'String'
    use std::string::{Self};
    
    // **FIX 2:** We import 'FreezeCapability' which we were missing
    use aptos_framework::coin::{Self, Coin, MintCapability, BurnCapability, FreezeCapability};

    // This struct will hold the "admin powers" (capabilities) for our token
    struct TokenAdminCaps has key {
        // **FIX 3:** We add a field to store the new 'freeze_cap'
        freeze_cap: FreezeCapability<WELL>,
        mint_cap: MintCapability<WELL>,
        burn_cap: BurnCapability<WELL>,
    }

    // This struct is the "name" of our coin. It's an empty "phantom" type.
    struct WELL has store {}

    // This function runs only ONCE when we first deploy the contract
    fun init_module(deployer: &signer) {
        
        // **FIX 4:** We now correctly receive all THREE capabilities
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<WELL>(
            deployer,
            string::utf8(b"Wellness Token"),  // Name
            string::utf8(b"WELL"),            // Symbol
            6,                                // Decimals
            true                              // Monitor supply? Yes.
        );

        // **FIX 5:** We store all three capabilities
        move_to(deployer, TokenAdminCaps {
            freeze_cap,
            mint_cap,
            burn_cap,
        });
    }

    // --- PUBLIC FUNCTIONS ---

    // Function for the user to call ONCE to create their token "wallet"
    public entry fun register_user(user: &signer) {
        if (!coin::is_account_registered<WELL>(signer::address_of(user))) {
            coin::register<WELL>(user);
        }
    }

    // Function for our AWS backend to call to reward a user
    public entry fun mint_to(admin: &signer, recipient_address: address, amount: u64) acquires TokenAdminCaps {
        
        let admin_caps = borrow_global<TokenAdminCaps>(signer::address_of(admin));
        
        let new_coins: Coin<WELL> = coin::mint(amount, &admin_caps.mint_cap);
        
        coin::deposit(recipient_address, new_coins);
    }
}